# CRUD API
This project is a simple CRUD API implemented with an in-memory database.

## [Technical assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## Installation

1. Clone the repository
2. Install dependencies with `npm install`

## Running the Application

The application can be run in two modes:

### Development Mode

Run the application in development mode with `npm run start:dev`. This uses `nodemon` or `ts-node-dev`.

### Production Mode

Run the application in production mode with `npm run start:prod`. This starts the build process and then runs the bundled file.

## Using the Application

Once you have the application running, you can interact with it through the following API endpoints:

1. **GET /api/users**: Retrieves all records. Initially, this will return an empty array.

2. **POST /api/users**: Creates a new object. The request body should contain the details of the new object. The response will contain the newly created record.

3. **GET /api/users/{userId}**: Retrieves a record by its id. Replace `{userId}` with the id of the object you want to retrieve. If the object exists, it will be returned. If it has been deleted or does not exist, you will receive a message that there is no such object.

4. **PUT /api/users/{userId}**: Updates a record. Replace `{userId}` with the id of the object you want to update, and include the new details in the request body. The response will contain the updated object. If the object does not exist, you will receive a message that there is no such object.

5. **DELETE /api/users/{userId}**: Deletes a record by its id. Replace `{userId}` with the id of the object you want to delete. You will receive a confirmation of successful deletion. If the object does not exist, you will receive a message that there is no such object.

## Testing

There are several test scenarios for the API. Run the tests with `npm test`. Test scenarios include:

- Get all records with a GET api/users request (an empty array is expected)
- Create a new object with a POST api/users request (a response containing newly created record is expected)
- Get the created record by its id with a GET api/user/{userId} request (the created record is expected)
- Update the created record with a PUT api/users/{userId} request (a response is expected containing an updated object with the same id)
- Delete the created object by id with a DELETE api/users/{userId} request (confirmation of successful deletion is expected)
- Try to get a deleted object by id with a GET api/users/{userId} request (expected answer is that there is no such object)

## Horizontal Scaling

The application supports horizontal scaling. Run multiple instances of the application using the Node.js Cluster API with `npm run start:multi`. This starts multiple instances of the application (equal to the number of available parallelism - 1 on the host machine), each listening on port PORT + n, with a load balancer that distributes requests across them using the Round-robin algorithm.

