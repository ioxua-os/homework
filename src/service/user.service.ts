import { User, UserType } from '../model';
import { TeacherService } from './teacher.service';
import { StudentService } from './student.service';
import { AbstractService } from './abstract.service';

export class UserService {

	private static instance: UserService
	private constructor(){}

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
				TeacherService.getInstance().list(),
				StudentService.getInstance().list()
			])
			.then(res => {
				const teacherUsers = res[0].map(each => each.user)
				const studentUsers = res[1].map(each => each.user)

				let allUsers = [...teacherUsers, ...studentUsers]
				if (login === "admin@admin.admin" && passwd === "admin") {
					resolve(new User("admin@admin.admin", "admin", UserType.ADMIN))
				}

				allUsers.forEach(user => {
					if (user.login === login && user.passwd === passwd)
						resolve(user)
				})
				resolve(null)
			})
		})
	}

}