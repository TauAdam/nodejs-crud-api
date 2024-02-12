import { IncomingMessage, ServerResponse } from 'http'
import { HTTP_METHODS, STATUS_CODE } from '../models'
import { UserService } from '../services/user.service'
import { sendFailure } from '../utils/response'

export const router = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
	const userService = new UserService()
	try {
		switch (req.method) {
			case HTTP_METHODS.GET:
				userService.get(req, res)
				break
			default:
				throw new Error('Invalid Http method')
		}
	} catch (error) {
		if (error instanceof Error) {
			sendFailure(res, error.message, STATUS_CODE.NOT_FOUND)
		}
	}
}
