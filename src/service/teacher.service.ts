import { datastore } from 'nedb-promise'
import { Teacher, User, UserType } from '../model';
import { AbstractService } from './abstract.service';

export class TeacherService extends AbstractService<Teacher> {

	private static instance: TeacherService

	_mockValues() {
		this.datastore.insert([
			new Teacher(
				"Elias", 
				"111.222.333-96", 
				new User("profelias@fatec.br", "profelias", UserType.TEACHER)
			),
			new Teacher(
				"Edith", 
				"222.333.444-69", 
				new User("profedith@fatec.br", "profedith", UserType.TEACHER),
			)
		])
	}

	public static getInstance() {
		if( !TeacherService.instance ) {
			TeacherService.instance = new TeacherService()
			TeacherService.instance._mockValues()
		}
		return TeacherService.instance
	}

	public getInstance() {
		return TeacherService.getInstance()
	}

}