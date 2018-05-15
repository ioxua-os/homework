import { Router, Request, Response } from "express"
import { SubjectService, TeacherService } from "../../service";
import { Teacher, Subject } from "../../model";

const router: Router = Router()

router.get('/subjects', (req: Request, res: Response) => {
	Promise.all([
		SubjectService.getInstance().list(),
		TeacherService.getInstance().list()
	])
	.then(results => {
		const subjects = results[0]
		const teachers = results[1]
		res.render('admin/subjects', { subjects, teachers })	
	})
})

router.post('/subject', (req: Request, res: Response) => {
	const subject = instantiateSubject(req)

	Promise.all([
		SubjectService.getInstance().save(subject),
		SubjectService.getInstance().list()
	])
	.then((data) => {
		const subjects 	= data[1]
		subjects.push(subject)

		res.render('admin/subjects', { subjects })	
	})
})

router.delete('/subject/:id', (req: Request, res: Response) => {
	SubjectService.getInstance().delete(req.params.id).then(teachers => {
		res.redirect('admin/subjects')
	})
})

// Edit
router.get('/subject/:id', (req: Request, res: Response) => {
	Promise.all([
		SubjectService.getInstance().list(),
		SubjectService.getInstance().getById(req.params.id),
		TeacherService.getInstance().list()
	])
	.then((data) => {
		const subjects 	= data[0]
		const subject 	= data[1]
		const teachers 	= data[2]
		res.render('admin/subjects', { subjects, subject, teachers })	
	})
})

router.put('/subject/:id', (req: Request, res: Response) => {
	const subject = instantiateSubject(req)

	SubjectService.getInstance().edit(subject).then((data) => {
		res.redirect('/admin/subjects')
	})
})

function instantiateSubject(req: Request): Subject {
	const subject = new Subject(
		req.body.code,
		req.body.name
	)

	if(req.params.id) 
		subject._id 	 = req.params.id
	if(req.body.teacherId != -1) {
		subject.teacher = new Teacher()
		subject.teacher._id = req.body.teacherId
	}
	
	return subject
}

export const SubjectController = router
