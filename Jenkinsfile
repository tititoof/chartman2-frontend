pipeline {
    agent {
        node {
            label 'agent_vuejs_elminster'
        }
    }

    stages {
        stage('Build') {
            steps {
                script {
                    echo 'Building..'
                    sh('''
                        rm -Rf ./node_modules
                        yarn install
                        yarn build    
                    ''')
                    
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                script {
                    withCredentials([string(credentialsId: 'sas-judo-backend-test', variable: 'TEST_CREDENTIALS')]) {
                        sh('''
                            echo "API_URL=http://localhost:8000" > ./.env
                        ''')
                        sh("yarn start &")
                        sh('''
                            yarn lint:js
                            yarn jest
                        ''')
                        echo 'Finished tests!'
                    }
                }
            }
        }
        stage('SonarQube Quality Gate') {
            steps {
                echo 'Check quality..'
                script {
                    def scannerHome = tool 'sonarscanner';
                    def sonarqubeBranch = 'chartman2-frontend-dev';
                    withSonarQubeEnv("sonarqube") {
                        if (env.BRANCH_NAME == 'main') {
                            sonarqubeBranch = 'chartman2-frontend'
                        }
                        sh "${tool("sonarscanner")}/bin/sonar-scanner \
                                -Dsonar.projectKey=$sonarqubeBranch \
                                -Dsonar.sources='pages, layouts, components, store' \
                                -Dsonar.exclusions=app/assets/**/* \
                                -Dsonar.host.url=http://192.168.1.204:9080 \
                                -Dsonar.login=dd720dccbf88391235e748c560c2be46672928c8 \
                                -Dsonar.testExecutionReportPaths=test-report.xml \
                                -Dsonar.javascript.lcov.reportPaths=./coverage/lcov.info"
                    }
                }
            }
        }
        stage("Quality Gate") {
            steps {
                script {
                    timeout(time: 1, unit: 'HOURS') {
                        def qualitygate = waitForQualityGate()
                        if (qualitygate.status != "OK") {
                            env.WORKSPACE = pwd()
                            error "Pipeline aborted due to quality gate coverage failure: ${qualitygate.status}"
                        }
                    }
                }
            }
        }
        stage('Github update') {
            steps {
                script {
                    def giteaBranch = env.BRANCH_NAME;
                    if (env.BRANCH_NAME.startsWith('PR')) {
                        echo "PR branch"
                    } else {
                        if (env.BRANCH_NAME == 'main') {
                            withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_CREDENTIALS')]) {
                                sh '''
                                    if git remote | grep github > /dev/null; then
                                        git remote rm github
                                    fi
                                    git remote add github https://$GITHUB_CREDENTIALS@github.com/tititoof/chartman2-frontend.git
                                '''
                                sh """
                                    touch github-update.txt
                                    git add .
                                    git commit -m "Github update"
                                    git push -f github HEAD:main
                                """
                            }
                        }
                        echo 'Github finished'
                    }
                }
            }
        }
        stage('Deploy') {
            environment {
                SERVER_SSH = credentials('tititoof_ssh_user_pswd')
                SERVER_IP = credentials('ovh-server-ip')
            }
            steps {
                script {
                    echo 'Deploying....'
                    if (env.BRANCH_NAME == 'main') {
                        withCredentials([sshUserPrivateKey(credentialsId: 'ssh-credentials-id', keyFileVariable: 'keyfile')]) {
                            sh 'sudo mkdir -p ~/.ssh && sudo cp ${keyfile} ~/.ssh/id_ed25519'
                            sh 'sudo chown jenkins:jenkins ~/.ssh && chmod 700 ~/.ssh && chmod 600 ~/.ssh/id_ed25519'
                        }
                        sh '''
                            ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_ed25519 -p2222 $SERVER_SSH@$SERVER_IP "[[ -d /var/www/websites/chartman2/frontend ]] && echo 'Directory exist' || git clone https://$GITHUB_CREDENTIALS@github.com/tititoof/chartman2-frontend.git /var/www/websites/chartman2/frontend"
                            ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_ed25519 -p2222 $SERVER_SSH@$SERVER_IP "cd /var/www/websites/chartman2/frontend && git fetch && git checkout main && git pull"
                            ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_ed25519 -p2222 $SERVER_SSH@$SERVER_IP "cd /var/www/websites/chartman2/frontend && yarn install"
                            ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_ed25519 -p2222 $SERVER_SSH@$SERVER_IP "cd /var/www/websites/chartman2/frontend && yarn build"
                        '''
                    }
                }
            }
        }
    }
}