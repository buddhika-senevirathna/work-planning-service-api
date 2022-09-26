# work-planning-service-api
 This project will show how to create a simple work plan management <br />
  - Register user <br />
  - Create Shift and manage shifts <br />

## Minimum Requirements
 - Node js
 - MongoDB

## Assumptions
 - I assume you already have installed Node js and MongoDB in your computer
 - If not Please follow these sites to install mongoDB and Node js
 - MongoDB -`https://www.mongodb.com/docs/manual/installation/`
 - Node JS - `https://docs.npmjs.com/downloading-and-installing-node-js-and-npm`

## Installation
- Download or clone this project (`git@github.com:buddhika-senevirathna/work-planning-service-api.git`)
- run `npm install`

### Create the .env file
- go to the config folder
- rename the `config.env.exmple` file into `config.env`
- update the content of the file
  - PORT - The port you need to run your server, default it will be 5000
  - Update the mongoDb database url

### running the server
- run the with the command `npm run dev`
(If you need to run with any other command please edit the `package.json`)

### Testing
 You can view all the end points in swagger documentation
 -Open the web browser and visit to the `http://localhost:5000/api-docs/`
 (Please change the port number accordingly  )