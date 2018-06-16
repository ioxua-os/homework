import * as path        from 'path'
import * as express     from 'express'
import * as session     from 'express-session'
import * as compileSass from 'express-compile-sass'
import * as Constants   from './constants'
import * as methodOverride from 'method-override'

import { User, UserType, HWResponse }  from './model'
import { UserService, TeacherService, SubjectService, AssignmentService, StudentService }  from './service'
import { authRequired } from './middlewares/auth.middleware'
import { AdminController, TeacherController, StudentController } from './controllers';
import { MaterialService } from './service/material.service';

// FIXME A very ugly fix e.e
interface Request extends express.Request {
	session: {[key: string]: any}
	//form: {[key: string]: any}
}

const app: express.Application = express()
const port: number = Number(process.env.PORT) || 3000;
const root: string = process.cwd()

let mainPages = {}
mainPages[UserType.ADMIN] = "/admin"
mainPages[UserType.TEACHER] = "/teacher"
mainPages[UserType.STUDENT] = "/student"

// FIXME: Eu sei que isso é uma gambiarra e.e
TeacherService.getInstance()
StudentService.getInstance()
SubjectService.getInstance()
MaterialService.getInstance()
AssignmentService.getInstance()

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
app.use(methodOverride('_method'))
app.use(session({
	secret: 'eu sou MA-RA-VI-LHO-SO',
	saveUninitialized: true
}))

app.use('/admin', /*authRequired(UserType.ADMIN),*/ AdminController)
app.use('/teacher', /*authRequired(UserType.TEACHER),*/ TeacherController)
app.use('/student', /*authRequired(UserType.STUDENT),*/ StudentController)

app.get('/', (req, res) => {
	res.render('index')
})

app.post('/login',
	// TODO Implement form validation
	(req: Request, res) => {
		UserService.getInstance().login(req.body['email'], req.body['password'])
		.then((usr: User) => {
			if(usr) {
				req.session[Constants.SESSION_KEYS.loggedInUser] = usr
				res.redirect(mainPages[''+usr.role]) // FIXME: Oh Lord, save-me
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

app.get('/logoff', (req: Request, res) => {
	delete req.session[Constants.SESSION_KEYS.loggedInUser]
	res.redirect('/')
})

app.listen(port, () => {
	console.log("Listening on port:", port)
})