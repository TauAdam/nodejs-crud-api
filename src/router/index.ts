import { IncomingMessage, ServerResponse } from 'http'
import { HTTP_METHODS, ERROR_MESSAGE } from '../models'
import { UserService } from '../services/user.service'
import { sendFailure } from '../utils/response'

export const router = (req: IncomingMessage, res: ServerResponse<IncomingMessage>, userService: UserService) => {
	try {
		switch (req.method) {
			case HTTP_METHODS.GET:
				userService.read(req, res)
				break
			case HTTP_METHODS.POST:
				userService.create(req, res)
				break
			case HTTP_METHODS.PUT:
				userService.update(req, res)
				break
			case HTTP_METHODS.DELETE:
				userService.delete(req, res)
				break
			default:
				throw new Error(ERROR_MESSAGE.NOT_METHOD)
		}
	} catch (error) {
		if (error instanceof Error) {
			sendFailure(res, error.message)
		}
	}
}
