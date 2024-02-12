const enum STATUS_CODE {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	NOT_FOUND = 404,
	INTERNAL_ERROR = 500,
}
const enum HTTP_METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}
const enum ERROR_MESSAGE {
	NOT_FOUND = "The requested endpoint doesn't exist",
	NOT_EXIST = 'The user with the provided ID not found',
	NOT_UUID = 'The provided user ID is not valid. Please provide a valid user ID',
	NOT_BODY = 'The provided user data is not valid',
	NOT_METHOD = 'The HTTP method provided is not valid for this endpoint',
	INTERNAL_ERROR = 'An internal server error occurred',
}

type UserSchema = UserBody & {
	id: string
}
type UserBody = {
	username: string
	age: number
	hobbies: string[]
}
export { STATUS_CODE, HTTP_METHODS, ERROR_MESSAGE }
export type { UserSchema, UserBody }
