import { IncomingMessage, Server, ServerResponse, createServer } from 'http'
import { UserService } from './services/user.service'
import { ERROR_MESSAGE } from './models'
import { sendFailure } from './utils/response'
import { router } from './router'

export class App {
	server: Server
	port: number

	constructor(port: number, userService: UserService) {
		this.port = port
		this.server = createServer((request: IncomingMessage, response: ServerResponse) => {
			try {
				response.setHeader('Content-Type', 'application/json')
				const { url } = request
				if (url?.startsWith('/api/users')) {
					router(request, response, userService)
				} else {
					throw new Error(ERROR_MESSAGE.NOT_FOUND)
				}
			} catch (error) {
				if (error instanceof Error) {
					sendFailure(response, error.message)
				}
			}
		})
	}

	init() {
		this.server.listen(this.port, () => {
			console.log(`Server is running on http://localhost:${this.port}`)
		})
	}
	close() {
		this.server.close()
	}
}
