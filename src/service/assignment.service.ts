import { Subject, Assignment, FinishedAssignment } from '../model';
import { AbstractService } from './abstract.service';
import { SubjectService } from './subject.service';
import { StudentService } from './student.service';

export class AssignmentService extends AbstractService<Assignment> {

	private static instance: AssignmentService

	_mockValues() {
		const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus sed ligula et vehicula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris elementum consequat tortor eget volutpat. Fusce ac pulvinar sapien, quis scelerisque mauris. Sed mauris nisi, pretium at massa dictum, fermentum gravida est. Etiam dolor lorem."
		const titles = [
			"Entrega do Trabalho",
			"Relatório: Passeio à Escola",
			"Seminário: Carreiras Futuras",
			"Análise Semiótica"
		]

		let date = new Date()
		let days = 0
		for(const title of titles) {
			let temp = new Date()
			temp.setDate(date.getDate() + days)
			days += 2
			this.datastore.insert(new Assignment(title, lorem, temp))
		}

		Promise.all([
			SubjectService.getInstance().getByCode("HST002"),
			SubjectService.getInstance().getByCode("SFT001"),
			SubjectService.getInstance().getByCode("SFT002"),
			this.getInstance().getByTitle(titles[0]),
			this.getInstance().getByTitle(titles[1]),
			this.getInstance().getByTitle(titles[2]),
			this.getInstance().getByTitle(titles[3]),
			StudentService.getInstance().getByName("Ioxua")
		])
		.then(results => {
			const history = results[0]
			const softwr1 = results[1]
			const softwr2 = results[2]
			const trab 	= results[3]
			const rela 	= results[4]
			const semi 	= results[5]
			const anal 	= results[6]
			const ioxua = results[7]

			trab.subject_id = softwr1._id
			rela.subject_id = softwr2._id
			semi.subject_id = softwr1._id
			anal.subject_id = history._id

			semi.finishedAssignments = [
				new FinishedAssignment(ioxua._id, lorem, new Date())
			]
			
			this.getInstance().edit(trab)
			this.getInstance().edit(rela)
			this.getInstance().edit(semi)
			this.getInstance().edit(anal)
		})
	}

	public static getInstance() {
		if( !AssignmentService.instance ) {
			AssignmentService.instance = new AssignmentService()
			AssignmentService.instance._mockValues()
		}
		return AssignmentService.instance
	}

	public getInstance() {
		return AssignmentService.getInstance()
	}

	getByTitle(title: string): Promise<Assignment> {
		return this.datastore.findOne({ title })
	}

	findBySubject(subject: Subject): Promise<Assignment[]> {
		return this.datastore.find({ subject_id: subject._id })
	}

	findBySubjectId(id: string): Promise<Assignment[]> {
		return this.datastore.find({ subject_id: id })
	}

}