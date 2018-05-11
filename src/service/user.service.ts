import { datastore } from 'nedb-promise'
import { User, UserType } from '../model';
import { AbstractService } from './abstract.service';

export class UserService extends AbstractService<User> {

	private static instance: UserService

	_mockValues() {
		this.datastore.insert(
			new User("admin@admin.admin", "admin", UserType.ADMIN),
		)
	}

	public static getInstance() {
		if( !UserService.instance ) {
			UserService.instance = new UserService()
			UserService.instance._mockValues()
		}
		return UserService.instance
	}

	public getInstance() {
		return UserService.getInstance()
	}

	login(login: string, passwd: string): Promise<User> {
		return this.datastore.findOne({login, passwd}) as Promise<User> 
	}

}