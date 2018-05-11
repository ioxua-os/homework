import * as 	   path from 'path'
import * as     express from 'express'
import * as  bodyParser from 'body-parser'
import * as        form from 'express-form'
import * as compileSass from 'express-compile-sass'

import { Request } from 'express'
import { UserService } from './service/users.service'
import { User } from './model';

const app: express.Application = express()
const port: number = Number(process.env.PORT) || 3000;
const root: string = process.cwd()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(compileSass({
    root: 'static',
    sourceMap: true,
    watchFiles: true,
    logToConsole: true
}))
app.use(express.static('static'))
app.use(express.urlencoded({extended: true}))

UserService.getInstance().list().then(res => {
    console.log(res)
})

app.get('/', (req, res) => {
	res.render('index')
})

app.post('/login',
    // TODO Implement form validation
    (req: Request, res) => {
        console.log(req.body)
        res.send(req.body['passwd'])
    }
)

app.listen(port, () => {
	console.log("Listening on port:", port)
})