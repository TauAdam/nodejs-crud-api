import { IncomingMessage, ServerResponse } from 'http'
import { STATUS_CODE } from '../models'

const sendSuccess = <T>(response: ServerResponse<IncomingMessage>, body: T, statusCode = STATUS_CODE.OK) => {
	response.statusCode = statusCode
	response.end(JSON.stringify(body))
}
const sendFailure = (response: ServerResponse<IncomingMessage>, message: string, statusCode = STATUS_CODE.OK) => {
	response.statusCode = statusCode
	response.statusMessage = message
	response.end(JSON.stringify({ message: message }))
}
export { sendSuccess, sendFailure }
