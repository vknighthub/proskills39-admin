#!/usr/bin/env zx

echo(chalk.blue("#Step 1 - Installing backend project dependencies"));

echo(
    "Please wait a while till the successful installation of the dependencies"
);

echo(chalk.blue("Install packages"));
await $`yarn --cwd /var/www/pixer-react/pixer-api`;

echo(chalk.blue("Running For API App with pm2"));

await $`pm2 start --name=mock-rest yarn --cwd /var/www/pixer-react/pixer-api -- start:prod`;
