import { Material, Subject } from '../model';
import { AbstractService } from './abstract.service';
import { SubjectService } from './subject.service';

export class MaterialService extends AbstractService<Material> {

	private static instance: MaterialService

	_mockValues() {
		const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper auctor ante. Proin sed lectus eu ipsum malesuada lacinia. Praesent lacinia leo neque, nec tempus nisi maximus id. Ut non."
		const titles = [
			"Padrões de Projeto I",
			"Padrões de Projeto II",
			"O Papel do Homem na Sociedade",
			"Fundamentos Matemágicos para a Ciência da Computação"
		]
		for(const title of titles)
			this.datastore.insert(new Material(title, lorem))

		Promise.all([
			SubjectService.getInstance().getByCode("HST002"),
			SubjectService.getInstance().getByCode("SFT001"),
			SubjectService.getInstance().getByCode("SFT002"),
			this.getInstance().getByTitle(titles[0]),
			this.getInstance().getByTitle(titles[1]),
			this.getInstance().getByTitle(titles[2]),
			this.getInstance().getByTitle(titles[3])
		])
		.then(results => {
			const history = results[0]
			const softwr1 = results[1]
			const softwr2 = results[2]
			const padroes = results[3]
			const padroe2 = results[4]
			const opapeld = results[5]
			const matemag = results[6]

			padroes.subject_id = softwr1._id
			padroe2.subject_id = softwr2._id
			opapeld.subject_id = history._id
			matemag.subject_id = softwr1._id
			
			this.getInstance().edit(padroes)
			this.getInstance().edit(padroe2)
			this.getInstance().edit(opapeld)
			this.getInstance().edit(matemag)
		})
	}

	public static getInstance() {
		if( !MaterialService.instance ) {
			MaterialService.instance = new MaterialService()
			MaterialService.instance._mockValues()
		}
		return MaterialService.instance
	}

	public getInstance() {
		return MaterialService.getInstance()
	}

	getByTitle(title: string): Promise<Material> {
		return this.datastore.findOne({ title })
	}

	findBySubject(subject: Subject): Promise<Material[]> {
		return this.datastore.find({ subject_id: subject._id })
	}

	findBySubjectId(id: string): Promise<Material[]> {
		return this.datastore.find({ subject_id: id })
	}

}