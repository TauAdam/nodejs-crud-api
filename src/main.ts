import * as dotenv from 'dotenv'
import { UserService } from './services/user.service'
import { App } from './app'
dotenv.config()

const port = parseInt(process.env.PORT || '3000', 10)

const app = new App(port, new UserService())

app.init()
