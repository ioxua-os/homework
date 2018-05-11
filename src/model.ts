
export class Entity {
	id: number
	createdAt: Date
}

export class Person extends Entity {
	name: string
	document: string
	user: User
	
	constructor(name: string, document: string, user: User) {
		super()
		this.name     = name
		this.document = document
		this.user     = user
	}
}

export class User extends Entity {
	login: string
	passwd: string
	role: string
	
	constructor(login: string, passwd: string, role: string) {
		super()
		this.login  = login
		this.passwd = passwd
		this.role  = role
	}
}

export class Teacher extends Person {
	
}

export class Student extends Person {

}

export class Assignment extends Entity {
	title: string
	limitDate: Date
	description: string
	finishedAssignments: FinishedAssignment[]
}

export class FinishedAssignment extends Entity {
	assigment: Assignment
	finishDate: Date
	student: Student
	content: string
}

export class Subject extends Entity {
	code: string
	name: string
	teacher: Teacher
}

export class Material extends Entity {
	title: string
	content: string
}