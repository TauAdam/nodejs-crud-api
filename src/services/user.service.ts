import { IncomingMessage, ServerResponse } from 'http'
import { ERROR_MESSAGE, STATUS_CODE, UserBody, UserSchema } from '../models'
import { sendFailure, sendSuccess } from '../utils/response'
import { v4 as uuid, validate } from 'uuid'

export class UserService {
	public database: UserSchema[] = []
	private getIdFromUrl(url: string | undefined) {
		if (!url || url === '/api/users') {
			return null
		}
		return url.split('/').at(-1)
	}
	private async parseRequestBody(req: IncomingMessage): Promise<UserBody> {
		return new Promise((resolve, reject) => {
			const dataChunks: Buffer[] = []
			req
				.on('data', (chunk): void => {
					dataChunks.push(chunk)
				})
				.on('end', () => {
					try {
						const body = JSON.parse(Buffer.concat(dataChunks).toString())
						resolve(body)
					} catch (error) {
						reject(error)
					}
				})
		})
	}
	read(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
		const id = this.getIdFromUrl(req.url)
		if (!id) {
			return sendSuccess(res, this.database)
		}
		const isValidId = validate(id)
		if (!isValidId) {
			return sendFailure(res, ERROR_MESSAGE.NOT_UUID, STATUS_CODE.BAD_REQUEST)
		}
		const record = this.database.find(user => user.id === id)
		if (!record) {
			return sendFailure(res, ERROR_MESSAGE.NOT_EXIST, STATUS_CODE.NOT_FOUND)
		}
		return sendSuccess(res, record)
	}
	create = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
		const { url } = req
		if (url !== '/api/users') {
			return sendFailure(res, ERROR_MESSAGE.NOT_FOUND)
		}
		try {
			const body = await this.parseRequestBody(req)
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
	update = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
		const id = this.getIdFromUrl(req.url)
		if (!id) {
			return sendFailure(res, ERROR_MESSAGE.NOT_FOUND)
		}
		const isValidId = validate(id)
		if (!isValidId) {
			return sendFailure(res, ERROR_MESSAGE.NOT_UUID, STATUS_CODE.BAD_REQUEST)
		}
		const recordIndex = this.database.findIndex(user => user.id === id)
		if (recordIndex === -1) {
			return sendFailure(res, ERROR_MESSAGE.NOT_EXIST, STATUS_CODE.NOT_FOUND)
		}
		try {
			const body = await this.parseRequestBody(req)
			const validationResult = this.validateBody(body)
			if (validationResult.isValid) {
				this.database[recordIndex] = { ...body, id }
				return sendSuccess(res, this.database[recordIndex])
			}
			return sendFailure(res, [ERROR_MESSAGE.NOT_BODY, ...validationResult.errors].join(', '), STATUS_CODE.BAD_REQUEST)
		} catch (error) {
			sendFailure(res, ERROR_MESSAGE.INTERNAL_ERROR, STATUS_CODE.INTERNAL_ERROR)
		}
	}
	delete(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
		const id = this.getIdFromUrl(req.url)
		if (!id) {
			return sendFailure(res, ERROR_MESSAGE.NOT_FOUND)
		}
		const isValidId = validate(id)
		if (!isValidId) {
			return sendFailure(res, ERROR_MESSAGE.NOT_UUID, STATUS_CODE.BAD_REQUEST)
		}
		const recordIndex = this.database.findIndex(user => user.id === id)
		if (recordIndex === -1) {
			return sendFailure(res, ERROR_MESSAGE.NOT_EXIST, STATUS_CODE.NOT_FOUND)
		}
		this.database.splice(recordIndex, 1)
		sendSuccess(res, null, STATUS_CODE.NO_CONTENT)
	}
	resetDatabase() {
		this.database = []
	}
}
