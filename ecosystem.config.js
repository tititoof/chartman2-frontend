module.exports = {
  apps: [
    {
      name: 'chartman2.fr',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env_production: {
        PORT: 80,
        NODE_ENV: 'production',
        API_URL: 'http://localhost:8000'
      }
    }
  ],

  // Deployment Configuration
  deploy: {
    production: {
      key: '/home/toofytroll/Projets/dockers/deploy-key-rsa',
      user: 'deploy',
      host: ['51.75.194.189'],
      ref: 'origin/main',
      repo: 'https://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@github.com/tititoof/chartman2-frontend.git',
      path: '/var/www/websites/chartman2.fr/frontend',
      'post-deploy': 'yarn install && yarn build && echo "API_URL=http://localhost:8000" > /var/www/websites/chartman2.fr/frontend/current/.env && pm2 startOrRestart ecosystem.config.js --update-env'
    }
  }
}
