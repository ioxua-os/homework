import { Router, Request, Response } from "express"
import { TeacherService } from "../../service";
import { Teacher, User, UserType } from "../../model";

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
	res.redirect('admin/teachers')
})

router.get('/teachers', (req: Request, res: Response) => {
	TeacherService.getInstance().list().then(teachers => {
		res.render('admin/teachers', { teachers })	
	})
})

router.post('/teacher', (req: Request, res: Response) => {
	const teacher = instantiateTeacher(req)

	Promise.all([
		TeacherService.getInstance().save(teacher),
		TeacherService.getInstance().list()
	])
	.then((data) => {
		const teachers 	= data[1]
		teachers.push(teacher)

		console.log(teachers)
		res.render('admin/teachers', { teachers })	
	})
})

router.delete('/teacher/:id', (req: Request, res: Response) => {
	TeacherService.getInstance().delete(req.params.id).then(teachers => {
		res.redirect('admin/teachers')
	})
})

router.get('/teacher/edit/:id', (req: Request, res: Response) => {
	Promise.all([
		TeacherService.getInstance().list(),
		TeacherService.getInstance().getById(req.params.id)
	])
	.then((data) => {
		const teachers 	= data[0]
		const teacher 	= data[1]
		res.render('admin/teachers', { teachers, teacher })	
	})
})

router.post('/teacher/edit/:id', (req: Request, res: Response) => {
	const teacher = instantiateTeacher(req)

	TeacherService.getInstance().edit(teacher).then((data) => {
		res.redirect('admin/teachers')
	})
})

function instantiateTeacher(req: Request): Teacher {
	const teacher = new Teacher(
		req.body.name,
		req.body.document,
		new User(req.body.email, req.body.passwd, UserType.TEACHER)
	)

	if(req.params.id) 
		teacher._id 	 = req.params.id
	
	return teacher
}

export const TeacherController = router
