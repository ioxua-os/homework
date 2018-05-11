import * as Datastore from 'nedb'
import { datastore } from 'nedb-promise'
import { User, UserType } from '../model';
import { Service } from './base.service';

export class UserService implements Service<User> {
	private static instance: UserService

	private users: datastore

	private constructor() {
		this.users = new datastore()
	}

	public static getInstance() {
		if( !UserService.instance ) {
			UserService.instance = new UserService()
			UserService.instance._mockValues()
		}
		return UserService.instance
	}

	login(login: string, passwd: string): Promise<User> {
		return this.users.findOne({login, passwd})
	}

	save(what: User|User[]): Promise<User|User[]> {
		return this.users.insert(what) as Promise<User|User[]>
	}

	getById(id: string): Promise<User> {
		return this.users.findOne({_id: id}) as Promise<User>
	}

	list(): Promise<User[]> {
		return this.users.find({}) as Promise<User[]>
	}

	edit(what: User): Promise<User> {
		return this.users.update({_id: what._id}, what) as Promise<User>
	}

	delete(what: User|number): Promise<number> {
		const key = what instanceof User? what._id : 
			typeof what == 'string'? what : null
		
		if( !key )
			throw new Error('What must be either an number or instance of User')

		return this.users.remove({_id: key}) as Promise<number>
	}

	_mockValues() {
		this.users.insert([
			new User("admin", 		"admin", 		UserType.ADMIN),
			new User("profelias", 	"profelias", 	UserType.TEACHER),
			new User("profedith", 	"profedith",	UserType.TEACHER),
			new User("aluno", 		"aluno", 		UserType.STUDENT),
			new User("profedith", 	"profedith", 	UserType.STUDENT)
		])
	}
}