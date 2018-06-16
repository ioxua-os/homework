export interface Error {
	message: string
	httpCode: number
}

interface HWResponseType {
	name: string
}

export class HWResponse {
	static readonly ERROR: HWResponseType = { name: "Erro" }
	static readonly INFO: HWResponseType = { name: "Informação" }

	static error(): HWResponse {
		return new HWResponse(HWResponse.ERROR)
	}

	static info(): HWResponse {
		return new HWResponse(HWResponse.INFO)
	}

	readonly type: string

	message: string
	detail: string
	httpCode: number
	[key: string]: any

	private constructor(type: HWResponseType) {
		this.type = type.name
	}
}

export class Entity {
	_id: string
}

export class Person extends Entity {
	name: string
	document: string
	user: User
	
	constructor(name?: string, document?: string, user?: User) {
		super()
		this.name     = name
		this.document = document
		this.user     = user
	}
}

export class UserType {
	static readonly TEACHER	: string = "Professor"
	static readonly STUDENT	: string = "Aluno"
	static readonly ADMIN	: string = "Administrador"
}

export class User {
	login: string
	passwd: string
	role: UserType
	
	constructor(login: string, passwd: string, role: UserType) {
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
	subject_id: string
	finishedAssignments: FinishedAssignment[]

	constructor(title: string, description: string, limitDate: Date) {
		super()
		this.title = title
		this.description = description
		this.limitDate = limitDate
	}
}

export class FinishedAssignment extends Entity {
	finishDate: Date
	student_id: string
	content: string

	constructor(student_id: string, content: string, finishDate: Date) {
		super()
		this.student_id = student_id
		this.content 	= content
		this.finishDate = finishDate
	}
}

export class Subject extends Entity {
	code: string
	name: string
	teacher_id: string
	student_ids: string[]
	
	constructor(code: string, name: string, teacher_id?: string) {
		super()
		this.code = code
		this.name = name
		this.teacher_id  = teacher_id
		this.student_ids = []
	}
}

export class Material extends Entity {
	title: string
	content: string
	subject_id: string

	constructor(title: string, content: string) {
		super()
		this.title = title
		this.content = content
	}
}