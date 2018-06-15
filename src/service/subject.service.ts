import { datastore } from 'nedb-promise'
import { Subject, Teacher } from '../model';
import { AbstractService } from './abstract.service';
import { TeacherService } from './teacher.service';
import { SSL_OP_NO_QUERY_MTU, EHOSTUNREACH } from 'constants';
import { StudentService } from './student.service';

export class SubjectService extends AbstractService<Subject> {

	private static instance: SubjectService

	_mockValues() {
		this.datastore.insert([
			new Subject("HST002", "Sociedade e Tecnologia"),
			new Subject("SFT001", "Engenharia de Software I"),
			new Subject("SFT002", "Engenharia de Software II"),
			new Subject("SFT003", "Engenharia de Software III"),
			new Subject("MAT001", "Cálculo")
		])

		Promise.all([
			TeacherService.getInstance().getByName("Edith"),
			TeacherService.getInstance().getByName("Elias"),
			TeacherService.getInstance().getByName("Leandro"),
			this.getInstance().getByCode("HST002"),
			this.getInstance().getByCode("SFT001"),
			this.getInstance().getByCode("SFT002"),
			StudentService.getInstance().getByName("Ioxua"),
			StudentService.getInstance().getByName("Lucas"),
			StudentService.getInstance().getByName("Amanda"),
			StudentService.getInstance().getByName("Talles")
		])
		.then(results => {
			const edith = results[0]
			const elias = results[1]
			const luque = results[2]
			const history = results[3]
			const softwr1 = results[4]
			const softwr2 = results[5]
			const ioxua = results[6]
			const lucas = results[7]
			const amand = results[8]
			const talle = results[9]

			history.teacher_id = elias._id
			softwr1.teacher_id = edith._id
			softwr2.teacher_id = edith._id

			history.student_ids = [lucas._id, amand._id]
			softwr1.student_ids = [ioxua._id, talle._id, amand._id]
			softwr2.student_ids = [talle._id, lucas._id]
			this.getInstance().edit(history)
			this.getInstance().edit(softwr1)
			this.getInstance().edit(softwr2)
		})
	}

	public static getInstance() {
		if( !SubjectService.instance ) {
			SubjectService.instance = new SubjectService()
			SubjectService.instance._mockValues()
		}
		return SubjectService.instance
	}

	public getInstance() {
		return SubjectService.getInstance()
	}

	findByTeacher(teacher: Teacher): Promise<Subject[]> {
		return this.datastore.find({teacher_id: teacher._id})
	}

	getByCode(code: string): Promise<Subject> {
		return this.datastore.findOne({ code })
	}

}