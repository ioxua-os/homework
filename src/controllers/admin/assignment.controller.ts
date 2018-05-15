import { Router, Request, Response } from "express"
import { SubjectService, TeacherService } from "../../service";
import { Teacher, User, UserType, Subject } from "../../model";

const router: Router = Router()

router.get('/assignment', (req: Request, res: Response) => {
	Promise.all([
		SubjectService.getInstance().list(),
		TeacherService.getInstance().list()
	])
	.then(results => {
		const subjects = results[0]
		const teachers = results[1]
		res.render('admin/assignment', { subjects, teachers })	
	})
})

export const AssignmentController = router
