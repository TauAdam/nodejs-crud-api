import { IncomingMessage, ServerResponse } from 'http'
import { ERROR_MESSAGE, STATUS_CODE, UserBody, UserSchema } from '../models'
import { sendFailure, sendSuccess } from '../utils/response'
import { v4 as uuid } from 'uuid'

export class UserService {
	private database: UserSchema[] = []

	read(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
		const { url } = req
		if (url !== '/api/users') {
			return sendFailure(res, ERROR_MESSAGE.NOT_FOUND)
		}
		sendSuccess(res, this.database)
	}
	create(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
		const { url } = req
		if (url !== '/api/users') {
			return sendFailure(res, ERROR_MESSAGE.NOT_FOUND)
		}
		const dataChunks: Buffer[] = []
		req
			.on('data', (chunk): void => {
				dataChunks.push(chunk)
			})
			.on('end', () => {
				try {
					const body = JSON.parse(Buffer.concat(dataChunks).toString())
					const validationResult = this.validateBody(body)
					if (validationResult.isValid) {
						const newUser: UserSchema = { ...body, id: uuid() }
						this.database.push(newUser)
						return sendSuccess(res, newUser, STATUS_CODE.CREATED)
					}
					return sendFailure(res, [ERROR_MESSAGE.NOT_BODY, ...validationResult.errors].join(', '), STATUS_CODE.BAD_REQUEST)
				} catch (error) {
					sendFailure(res, ERROR_MESSAGE.INTERNAL_ERROR, STATUS_CODE.INTERNAL_ERROR)
				}
			})
	}
	validateBody(body: UserBody) {
		const errors: string[] = []

		if (!('username' in body) || typeof body.username !== 'string') {
			errors.push('Invalid or missing username')
		}
		if (!('age' in body) || typeof body.age !== 'number') {
			errors.push('Invalid or missing age')
		}
		if (!('hobbies' in body) || !Array.isArray(body.hobbies) || !body.hobbies.every(hobby => typeof hobby === 'string')) {
			errors.push('Invalid or missing hobbies')
		}

		return {
			isValid: errors.length === 0,
			errors,
		}
	}
}
