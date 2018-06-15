import * as Constants   from '../constants'

import { Router, Request, Response } from "express"
import { TeacherService, SubjectService, AssignmentService, StudentService } from "../service";
import { Teacher, Subject, Material, Assignment, Student, User, UserType } from '../model';
import { RequestHandler } from 'express-serve-static-core';
import { MaterialService } from '../service/material.service';
import * as moment from 'moment'

interface TempResult {
	teacher: Teacher
	subjects: Subject[]
}

const router: Router = Router()

// FIXME A very ugly fix e.e
interface SessionRequest extends Request {
	session: {[key: string]: any}
	//form: {[key: string]: any}
}

router.get('/', (req: SessionRequest, res: Response): void => {
	resolveTeacher(req)
	.then((temp: TempResult): void => {
		res.render('teacher/index', {
			subjects: temp.subjects,
			teacher: temp.teacher
		})
	})
})

router.post('/subjects/:id/materials', (req: SessionRequest, res) => {
	const material = instantiateMaterial(req)
	MaterialService.getInstance().save(material)
	.then(_ => {
		res.redirect('/teacher/subjects/' + req.params.id + '/materials')
	})
})

router.post('/subjects/:id/assignments', (req: SessionRequest, res) => {
	const assignment = instantiateAssignment(req)
	AssignmentService.getInstance().save(assignment)
	.then(_ => {
		res.redirect('/teacher/subjects/' + req.params.id + '/assignments')
	})
})

router.post('/subjects/:id/students', (req: SessionRequest, res) => {
	const student = instantiateStudent(req)
	StudentService.getInstance().save(student)
	.then(_ => {
		res.redirect('/teacher/subjects/' + req.params.id + '/students')
	})
})

router.put('/subjects/:id/materials/:matid', (req, res) => {
	const material = instantiateMaterial(req)
	MaterialService.getInstance().edit(material).then(_ => {
		res.redirect('/teacher/subjects/' + req.params.id + '/materials')
	})
})

router.put('/subjects/:id/assignments/:assid', (req, res) => {
	const assignment = instantiateAssignment(req)
	AssignmentService.getInstance().edit(assignment).then(_ => {
		res.redirect('/teacher/subjects/' + req.params.id + '/assignments')
	})
})

router.put('/subjects/:id/students/:stuid', (req, res) => {
	const student = instantiateStudent(req)
	StudentService.getInstance().edit(student).then(_ => {
		res.redirect('/teacher/subjects/' + req.params.id + '/students')
	})
})

router.delete('/materials/:id', (req: SessionRequest, res) => {
	MaterialService.getInstance().delete(req.params.id).then(_ => {
		res.redirect('/teacher/subjects/' + req.params.id + '/materials')
	})
})
router.delete('/assignments/:id', (req, res) => {
	AssignmentService.getInstance().delete(req.params.id).then(_ => {
		res.redirect('/teacher/subjects/' + req.params.id + '/assignments')
	})
})
router.delete('/students/:id', (req, res) => {
	StudentService.getInstance().delete(req.params.id).then(_ => {
		res.redirect('/teacher/subjects/' + req.params.id + '/students')
	})
})

router.get('/subjects/:id/students/:stuid/edit', subjectRemix('teacher/subjectstudents'))
router.get('/subjects/:id/materials/:matid/edit', subjectRemix('teacher/subjectmaterials'))
router.get('/subjects/:id/assignments/:assid/edit', subjectRemix('teacher/subjectassignments'))

router.get('/subjects/:id/students', subjectRemix('teacher/subjectstudents'))
router.get('/subjects/:id/materials', subjectRemix('teacher/subjectmaterials'))
router.get('/subjects/:id/assignments', subjectRemix('teacher/subjectassignments'))

function subjectRemix(template: string): RequestHandler {
	return (req: SessionRequest, res) => {
		subjectCommon(req)
		.then(result => {
			res.render(template, result)
		})
	}
}

function subjectCommon(req: SessionRequest): Promise<any> {
	return new Promise(resolve => {
		Promise.all([
			resolveTeacher(req),
			SubjectService.getInstance().getById(req.params.id),
			AssignmentService.getInstance().getById(req.params.assid),
			MaterialService.getInstance().getById(req.params.matid),
			StudentService.getInstance().getById(req.params.stuid)
		])
		.then(results => {
			const temp: TempResult = results[0]
			const subject: Subject = results[1]
			const assignment: Assignment = results[2]
			const material: Material = results[3]
			const student: Student = results[4]
	
			Promise.all([
				MaterialService.getInstance().findBySubject(subject),
				AssignmentService.getInstance().findBySubject(subject),
				StudentService.getInstance().findById(subject.student_ids)
			])
			.then(results => {
				const materials = results[0]
				const assignments = results[1]
				const students = results[2]
	
				const data = {
					subjects: temp.subjects, 
					teacher: temp.teacher,
					subject,
					materials,
					assignments,
					moment,
					assignment,
					material,
					students,
					student
				}

				resolve(data)
			})
		})
	})
}

function resolveTeacher(req: SessionRequest): Promise<TempResult> {
	const loggedUser = req.session[Constants.SESSION_KEYS.loggedInUser]
	return new Promise((resolve, _) => {
		TeacherService.getInstance().getByUser(loggedUser)
		.then(teacher => {
			SubjectService.getInstance().findByTeacher(teacher)
			.then(subjects => {
				resolve( {teacher, subjects} )
			})
		})
	})
}

function instantiateMaterial(req: Request): Material {
	const material = new Material(
		req.body.title,
		req.body.content
	)

	if (req.params.id)
		material.subject_id = req.params.id

	if (req.params.matid) 
		material._id = req.params.matid
	
	return material
}

function instantiateAssignment(req: Request): Assignment {
	const assignment = new Assignment(
		req.body.title,
		req.body.description,
		moment(req.body.limitDate, 'll').toDate()
	)

	if (req.params.id)
		assignment.subject_id = req.params.id

	if (req.params.assid) 
		assignment._id = req.params.assid
	
	return assignment
}

function instantiateStudent(req: Request): Student {
	const student = new Student(
		req.body.name,
		req.body.document,
		new User(req.body.email, req.body.passwd, UserType.TEACHER)
	)

	if(req.params.stuid) 
		student._id = req.params.stuid
	
	return student
}

export const TeacherController = router
