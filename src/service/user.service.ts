import { User } from '../model';
import { TeacherService } from './teacher.service';

export class UserService {

	private static instance: UserService

	public static getInstance() {
		if( !UserService.instance ) {
			UserService.instance = new UserService()
		}
		return UserService.instance
	}

	public getInstance() {
		return UserService.getInstance()
	}

	login(login: string, passwd: string): Promise<User> {
		return new Promise<User>((resolve, _) => {
			Promise.all([
				TeacherService.getInstance().list()
			])
			.then(res => {
				const teacherUsers = res[0].map(each => each.user)
	
				let allUsers = [...teacherUsers]
				allUsers.forEach(user => {
					if (user.login === login && user.passwd === passwd)
						resolve(user)
				})
				resolve(null)
			})
		})
	}

}