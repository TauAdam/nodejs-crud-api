import { IncomingMessage, ServerResponse } from 'http'
import { UserSchema } from '../models'
import { sendSuccess } from '../utils/response'

export class UserService {
	private db: UserSchema[] = []

	get(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
		const { url } = req
		if (url === '/api/users') {
			sendSuccess(res, this.db)
		}
	}
}
