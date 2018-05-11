import * as Datastore from 'nedb'

export interface Service<T> {
	save(what: T|T[]): Promise<T|T[]>
	getById(id: string): Promise<T>
	list(): Promise<T[]>
	edit(what: T): Promise<T>
	delete(what: T|number): Promise<number>
	mockValues(): void
}
