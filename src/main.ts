import { IncomingMessage, ServerResponse, createServer } from 'http'
import * as dotenv from 'dotenv'
import { router } from './router'
import { sendFailure } from './utils/response'
import { STATUS_CODE } from './models'
dotenv.config()

const port = Number(process.env.PORT) || 4000

const server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
	try {
		response.setHeader('Content-Type', 'application/json')
		const { url } = request
		if (url?.startsWith('/api/users')) {
			router(request, response)
		} else {
			throw new Error('Resource not found')
		}
	} catch (error) {
		if (error instanceof Error) {
			sendFailure(response, error.message, STATUS_CODE.NOT_FOUND)
		}
	}
})

server.listen(port, () => {
	console.log(`Server is listening on port: ${port}, and process id: ${process.pid}`)
})
