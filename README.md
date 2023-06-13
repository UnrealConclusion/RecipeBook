# RecipeBook
A recipe book application that allows the user to add recipes to a database and search for them by ingredients.

## Architecture and Technologies 
The application is build with a MERN stack architecture. The back-end consists of a Mongo database and a node server. The server connects to and interacts with the database using Mongoose, an object data modeling library for MongoDB. An api is made available to the front-end using Express.js. The front-end of the application is built with React-js. 

## Files
- Front-end
    - the inner reverse-recipe folder contains the React-js application
- Server
    - the servers folder contains the node server
    - queries can be found in the controllers folder in recipe-ctrl.js
    - recipes are broken into 3 seperate collections
        - models can be found in server/model folder

### Running the Application
- call withing the application folder to run the front-end application
```
    npm start
```
- call withing the application folder to run the front-end application
```
    node index.js
```
