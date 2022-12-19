#! /bin/bash

echo "Enter your server username (ex: ubuntu)"
read username

echo "Enter server ip address (ex: 11.111.111.11)"
read ip_address

echo "########### connecting to server... ###########"
echo "${username}"
echo "${ip_address}"
ssh -o StrictHostKeyChecking=no -l "${username}" "${ip_address}" "sudo mkdir -p /var/www/pixer-react; sudo chown -R \$USER:\$USER /var/www; sudo apt install zip unzip";

if [ -d "./pixer-api" ]; then
  echo 'Zipping deployment folder'
  yarn --cwd ./pixer-api
  yarn --cwd ./pixer-api build
  rm -rf ./pixer-api/node_modules
  zip -r ./pixer-api.zip ./pixer-api
fi

if [ -d "./deployment" ]; then
  echo 'Zipping deployment folder'
  zip -r ./deployment.zip ./deployment
fi

if [ -f "./pixer-api.zip" ] && [ -f "./deployment.zip" ]; then
    echo 'Uploading pixer-api.zip to server...'
    scp "./pixer-api.zip" "${username}@${ip_address}:/var/www/pixer-react"
    echo 'uploaded pixer-api.zip to server'
    ssh -o StrictHostKeyChecking=no -l "${username}" "${ip_address}" "unzip /var/www/pixer-react/pixer-api.zip -d /var/www/pixer-react";

    echo 'Uploading deployment.zip to server...'
    scp "./deployment.zip" "${username}@${ip_address}:/var/www/pixer-react"
    echo 'uploaded deployment.zip to server'
    ssh -o StrictHostKeyChecking=no -l "${username}" "${ip_address}" "unzip /var/www/pixer-react/deployment.zip -d /var/www/pixer-react";
else
  echo "pixer api and deployment zip file missing"
fi

echo "installing google zx for further script"
npm i -g zx
