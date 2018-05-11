import { datastore } from 'nedb-promise'
import { Subject } from '../model';
import { AbstractService } from './abstract.service';

export class SubjectService extends AbstractService<Subject> {

	private static instance: SubjectService

	_mockValues() {
		this.datastore.insert([
			new Subject("HST002", "Sociedade e Tecnologia"),
			new Subject("HST002", "Engenharia de Software I"),
			new Subject("HST002", "Engenharia de Software II"),
			new Subject("HST002", "Engenharia de Software III"),
			new Subject("HST002", "Cálculo")
		])
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

}