import { IncomingMessage, ServerResponse, createServer } from 'http'
import * as dotenv from 'dotenv'
import { router } from './router'
import { sendFailure } from './utils/response'
import { ERROR_MESSAGE } from './models'
dotenv.config()

const port = parseInt(process.env.PORT || '3000', 10)

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
	try {
		response.setHeader('Content-Type', 'application/json')
		const { url } = request
		if (url?.startsWith('/api/users')) {
			router(request, response)
		} else {
			throw new Error(ERROR_MESSAGE.NOT_FOUND)
		}
	} catch (error) {
		if (error instanceof Error) {
			sendFailure(response, error.message)
		}
	}
})

server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
