import { Teacher, User, UserType, Student } from '../model';
import { AbstractService } from './abstract.service';

export class StudentService extends AbstractService<Student> {

	private static instance: StudentService

	_mockValues() {
		this.datastore.insert([
			new Student(
				"Ioxua", 
				"111.222.333-96",
				new User("ioxua@fatec.br", "ioxua", UserType.STUDENT)
			),
			new Student(
				"Lucas", 
				"222.333.444-69",
				new User("lucas@fatec.br", "lucas", UserType.STUDENT)
			),
			new Student(
				"Amanda", 
				"333.444.555-75",
				new User("amanda@fatec.br", "amanda", UserType.STUDENT)
			),
			new Student(
				"Talles", 
				"444.555.666-98",
				new User("talles@fatec.br", "talles", UserType.STUDENT)
			)
		])
	}

	public static getInstance() {
		if( !StudentService.instance ) {
			StudentService.instance = new StudentService()
			StudentService.instance._mockValues()
		}
		return StudentService.instance
	}

	public getInstance() {
		return StudentService.getInstance()
	}

	getByUser(user: User): Promise<Teacher> {
		return this.datastore.findOne({"user.login": user.login, "user.passwd": user.passwd})
	}

	getByName(name: string): Promise<Teacher> {
		return this.datastore.findOne({ name })
	}

}