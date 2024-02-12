const enum STATUS_CODE {
	OK = 200,
	CREATED = 201,
	NOT_FOUND = 404,
	BAD_REQUEST = 400,
	SERVER_ERROR = 500,
}
const enum HTTP_METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}
type UserSchema = USER & {
	id: string
}
type USER = {
	username: string
	age: number
	hobbies: string[]
}
export { STATUS_CODE, HTTP_METHODS }
export type { UserSchema }
