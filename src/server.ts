import * as path        from 'path'
import * as form        from 'express-form'
import * as express     from 'express'
import * as session     from 'express-session'
import * as bodyParser  from 'body-parser'
import * as compileSass from 'express-compile-sass'
import * as NedbStore 	from 'connect-nedb-session-two'
import * as Constants   from './constants'

import { User, UserType, HWResponse }  from './model'
import { UserService }  from './service'
import { authRequired } from './middlewares/auth.middleware'
import { AdminController } from './controllers';

// A very ugly fix e.e
interface Request extends express.Request {
	session: {[key: string]: any}
	//form: {[key: string]: any}
}

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
app.use('/static', express.static('static'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
	secret: 'eu sou MA-RA-VI-LHO-SO',
	saveUninitialized: true
}))

app.use('/admin', /*authRequired(UserType.ADMIN),*/ AdminController)

app.get('/', (req, res) => {
	res.render('index')
})

app.post('/login',
	// TODO Implement form validation
	(req: Request, res) => {
		UserService.getInstance().login(req.body['email'], req.body['password'])
		.then((usr) => {
			console.log(usr)
			if(usr) {
				res.redirect('/admin')
				req.session[Constants.SESSION_KEYS.loggedInUser] = usr
				return
			}
			else
				res.render('login', { error: Constants.DEFAULT_ERRORS.loginError })
		})
		.catch(err => {
			const response: HWResponse = Constants.DEFAULT_ERRORS.serverError
			res.render('error', {response})
		})
	}
)

app.listen(port, () => {
	console.log("Listening on port:", port)
})