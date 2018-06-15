import * as Constants   from '../constants'

import { Router, Request, Response } from "express"
import { TeacherService, SubjectService } from "../service";
import { Teacher, Subject } from '../model';

const router: Router = Router()

// FIXME A very ugly fix e.e
interface SessionRequest extends Request {
	session: {[key: string]: any}
	//form: {[key: string]: any}
}

router.get('/', (req: SessionRequest, res: Response): void => {
	const loggedUser = req.session[Constants.SESSION_KEYS.loggedInUser]
	TeacherService.getInstance().getByUser(loggedUser)
	.then((teacher: Teacher): void => {
		Promise.all([
			SubjectService.getInstance().findByTeacher(teacher),
		])
		.then((results: any[]): void => {
			const subjects = results[0]
			res.render('teacher/index', {subjects, teacher})
		})
	})
})

router.get('/subjects/:id', (req, res) => {
	
})

export const TeacherController = router
