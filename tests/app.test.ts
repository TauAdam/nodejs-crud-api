import { RequestOptions, request } from 'http'
import { v4 as uuid } from 'uuid'
import { UserService } from '../src/services/user.service'
import { App } from '../src/app'

const defaultUser = {
	username: 'admin',
	age: 20,
	hobbies: ['reading', 'coding'],
}
const port = 8000
const options: RequestOptions = {
	hostname: 'localhost',
	port: port,
	path: '/api/users',
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
}

describe('App', () => {
	let app: App
	const userService = new UserService()

	beforeEach(() => {
		userService.resetDatabase()
	})

	afterAll(() => {
		app.close()
	})

	beforeAll(() => {
		app = new App(port, userService)
		app.init()
	})

	it('should GET /api/users and return empty array', done => {
		const req = request(options, response => {
			expect(response.statusCode).toBe(200)
			let data = ''
			response.on('data', chunk => {
				data += chunk
			})
			response.on('end', () => {
				expect(JSON.parse(data)).toEqual(userService.database)
				done()
			})
		})
		req.end()
	})

	it('should POST /api/users and return the expectedUser', done => {
		const req = request({ ...options, method: 'POST' }, response => {
			expect(response.statusCode).toBe(201)
			let data = ''
			response.on('data', chunk => {
				data += chunk
			})
			response.on('end', () => {
				const expectedUser = JSON.parse(data)
				expect(expectedUser).toMatchObject(defaultUser)
				expect(expectedUser.id).toBeDefined()
				expect(expectedUser.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
				done()
			})
		})
		req.write(JSON.stringify(defaultUser))
		req.end()
	})

	it('should GET /api/users/{userId} and return the created record by its id', done => {
		const expectedUser = { ...defaultUser, id: uuid() }
		userService.database.push(expectedUser)
		const req = request({ ...options, path: `/api/users/${expectedUser.id}` }, response => {
			expect(response.statusCode).toBe(200)
			let data = ''
			response.on('data', chunk => {
				data += chunk
			})
			response.on('end', () => {
				expect(JSON.parse(data)).toEqual(expectedUser)
				done()
			})
		})
		req.end()
	})

	it('should update /api/users/{userId} and return the updated record by its id', done => {
		const expectedUser = { ...defaultUser, id: uuid() }
		userService.database.push(expectedUser)
		const updatedUser = { ...expectedUser, age: 21 }
		const req = request({ ...options, path: `/api/users/${expectedUser.id}`, method: 'PUT' }, response => {
			expect(response.statusCode).toBe(200)
			let data = ''
			response.on('data', chunk => {
				data += chunk
			})
			response.on('end', () => {
				expect(JSON.parse(data)).toEqual(updatedUser)
				done()
			})
		})
		req.write(JSON.stringify(updatedUser))
		req.end()
	})

	it('should delete created object by id, with DELETE /api/users/{userId}', done => {
		const newUser = { ...defaultUser, id: uuid() }
		userService.database.push(newUser)
		const req = request({ ...options, path: `/api/users/${newUser.id}`, method: 'DELETE' }, response => {
			expect(response.statusCode).toBe(204)
			done()
		})
		req.end()
	})

	it('should return no object with a GET api/users/{userId} request for a deleted object by id', done => {
		const req = request({ ...options, path: `/api/users/${uuid()}` }, response => {
			expect(response.statusCode).toBe(404)
			done()
		})
		req.end()
	})
})
