# Discod bot template
This is a default template for creating a discord bot thats focussed on minimalism. 
It only has the default discord packages installed and its easy to setup and expand uppon.

## Installation
```sh
npm i -g yarn
yarn
cp .env.example .env # this copies the .env file, edit variables in this file!
# Create and edit commands in the `commands` folder
yarn build
yarn start
```

### Using PM2
```sh
npm i -g pm2
# Follow the installation process above
pm2 start pm2.json
pm2 dump # recommended
```

### Extra notes
```
The Slash command are build upon the DiscordSlashCommand interface.

Every slash command is in the commands folder and uses the standard discord packages to create the command data to upload to discord. And the code that the bot should execute when the command is being used

The config files should be loaded in after loading in the .env in the index.ts file.

All typescript files wil be compiled into the dist folder by default. If you want to compile and run on every change, you should use tsc watch to compile on changes and listen with nodemon to the changes on the /dist/index.js.

All credentia ls should go into .env file and in the config folder we create a file for what config we want to access.
Take for example the discord_config.ts
```
