# CRUD API
This project is a simple CRUD API implemented with an in-memory database.

## [Technical assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## Installation

1. Clone the repository
```bash
https://github.com/TauAdam/nodejs-crud-api.git
```
2. Install dependencies
```bash
npm install
```

## Running the Application

Development Mode
```bash
npm run start:dev
```

Production Mode
```bash
npm run start:prod
```

Testing:
```bash
npm test
```
## Usage

Once you have the application running, you can interact with it through the following API endpoints:

1. **GET /api/users**: Retrieves all records. Initially, this will return an empty array.

2. **POST /api/users**: Creates a new object. The request body should contain the details of the new object. The response will contain the newly created record.

3. **GET /api/users/{userId}**: Retrieves a record by its id. Replace `{userId}` with the id of the object you want to retrieve. If the object exists, it will be returned. If it has been deleted or does not exist, you will receive a message that there is no such object.

4. **PUT /api/users/{userId}**: Updates a record. Replace `{userId}` with the id of the object you want to update, and include the new details in the request body. The response will contain the updated object. If the object does not exist, you will receive a message that there is no such object.

5. **DELETE /api/users/{userId}**: Deletes a record by its id. Replace `{userId}` with the id of the object you want to delete. You will receive a confirmation of successful deletion. If the object does not exist, you will receive a message that there is no such object.

## Test Cases

1. Get all records with a GET api/users request
	- Expected Result: An empty array

2. Create a new object with a POST api/users request
	- Expected Result: A response containing the newly created record

3. Get the created record by its id with a GET api/user/{userId} request
	- Expected Result: The created record

4. Update the created record with a PUT api/users/{userId} request
	- Expected Result: A response containing the updated object with the same id

5. Delete the created object by id with a DELETE api/users/{userId} request
	- Expected Result: Confirmation of successful deletion

6. Get a deleted object by id with a GET api/users/{userId} request
	- Expected Result: A message stating that there is no such object