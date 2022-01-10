#!/bin/bash

cd /var/www/websites/chartman2.fr/frontend/current
yarn install 
echo "API_URL=https://api.chartman2.fr" > /var/www/websites/chartman2.fr/frontend/current/.env 
echo "WEBSITE_URL=https://chartman2.fr" >> /var/www/websites/chartman2.fr/frontend/current/.env 
yarn build 
cp /home/deploy/chartman2.fr/frontend/ecosystem.config.js /var/www/websites/chartman2.fr/frontend/current/
pm2 stop ecosystem.config.js 
pm2 start ecosystem.config.js --update-env