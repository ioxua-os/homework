import * as Constants   from '../constants'

import { Router, Request, Response } from "express"
import { TeacherService, SubjectService, AssignmentService, StudentService } from "../service";
import { Teacher, Subject, Material, Assignment, Student, User, UserType } from '../model';
import { RequestHandler } from 'express-serve-static-core';
import { MaterialService } from '../service/material.service';
import * as moment from 'moment'

interface TempResult {
	student: Student
	subjects: Subject[]
}

const router: Router = Router()

// FIXME A very ugly fix e.e
interface SessionRequest extends Request {
	session: {[key: string]: any}
	//form: {[key: string]: any}
}

router.get('/', (req: SessionRequest, res: Response): void => {
	resolveStudent(req)
	.then((temp: TempResult): void => {
		res.render('student/index', {
			subjects: temp.subjects,
			student: temp.student
		})
	})
})

router.get('/subjects/:subid/materials', (req: SessionRequest, res) => {
	Promise.all([
		resolveStudent(req),
		MaterialService.getInstance().findBySubjectId(req.params.subid),
		SubjectService.getInstance().getById(req.params.subid)
	])
	.then(result => {
		const data = Object.assign({materials: result[1], subject: result[2], moment}, result[0])
		res.render('student/material', data)
	})
})

router.get('/subjects/:subid/assignments', (req: SessionRequest, res) => {
	Promise.all([
		resolveStudent(req),
		AssignmentService.getInstance().findBySubjectId(req.params.subid),
		SubjectService.getInstance().getById(req.params.subid)
	])
	.then(result => {
		const data = Object.assign({assignments: result[1], subject: result[2], moment, hasConcluded}, result[0])
		res.render('student/assignments', data)
	})
})

function hasConcluded(assignment: Assignment, student: Student) {
	if ( !assignment.finishedAssignments )
		return false
		
	return assignment.finishedAssignments.some(each => {
		return each.student_id === student._id
	})
}






/*router.post('/subjects/:id/assignments', (req: SessionRequest, res) => {
	const assignment = instantiateAssignment(req)
	AssignmentService.getInstance().save(assignment)
	.then(_ => {
		res.redirect('/teacher/subjects/' + req.params.id + '/assignments')
	})
})

router.put('/subjects/:id/assignments/:assid', (req, res) => {
	const assignment = instantiateAssignment(req)
	AssignmentService.getInstance().edit(assignment).then(_ => {
		res.redirect('/teacher/subjects/' + req.params.id + '/assignments')
	})
})*/



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
			resolveStudent(req),
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
					teacher: temp.student,
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

function resolveStudent(req: SessionRequest): Promise<TempResult> {
	const loggedUser = req.session[Constants.SESSION_KEYS.loggedInUser]
	return new Promise((resolve, _) => {
		StudentService.getInstance().getByUser(loggedUser)
		.then(student => {
			SubjectService.getInstance().findByStudent(student)
			.then(subjects => {
				resolve( {student, subjects} )
			})
		})
	})
}

export const StudentController = router
