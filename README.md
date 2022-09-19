# Scopic Software - DevOps Skill Test

## Simple Inventory Application

This is a very simple and basic product inventory application.
It is an application working with Node.js in the backend with SQL database (Postgress or MySQL) as a persistant layer and React with Bootstrap on the frontend.

The goal of this repository is to provide a real world scenario application that is ready to be deployed.

## Build & Run

1. Install prerequisistes needed based on project description.

2. Open 'frontend/src/config/localhost.js' or 'frontend/src/config/production.js'

   2.1. Set your custom configs

3. Open 'backend/config/localhost.js' or 'backend/config/production.js'

   3.1. Set your custom configs

### Run Development

1. Go to the 'frontend' folder

   1.1. Run `npm install`

   1.2. Run `npm run start`

2. Go to the 'backend' folder

   2.1. Run `npm run install`

   2.2. Run `npm run start`

### Run Production

3. Go to the root folder

   3.1. Run `npm run build:production`

   3.2. Run `npm run start:production`

### Initialize Database

You can create the database tables by:

1. Go to 'backend' folder

   1.1. Run `npm run db:reset:localhost`, or

   1.2. Run `npm run db:reset:production`

**These commands will DROP ALL THE DATABASE TABLES. Make sure you are running it pointing to the correct database.**
