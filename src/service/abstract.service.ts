import * as Datastore from 'nedb'
import { datastore } from 'nedb-promise'
import { Entity } from '../model';
import { Service } from './base.service';

export abstract class AbstractService<T extends Entity> implements Service<T> {
	protected datastore: datastore

	protected constructor() {
		this.datastore = new datastore()
	}

	abstract _mockValues(): void
	public abstract getInstance(): AbstractService<T>
	
	save(what: T|T[]): Promise<T|T[]> {
		return this.datastore.insert(what) as Promise<T|T[]>
	}

	getById(id: string): Promise<T> {
		return this.datastore.findOne({_id: id}) as Promise<T>
	}

	list(): Promise<T[]> {
		return this.datastore.find({}) as Promise<T[]>
	}

	edit(what: T): Promise<T> {
		return this.datastore.update({_id: what._id}, what) as Promise<T>
	}

	delete(what: T|string): Promise<number> {
		const key = typeof what == 'string'? what : what._id
		
		if( !key )
			throw new Error('What must be either an number or instance of User')

		return this.datastore.remove({_id: key}) as Promise<number>
	}
}
