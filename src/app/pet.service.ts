import { Injectable } from '@angular/core'

interface pet {
	namePet: string,
	gender: string,
	type: string,
	breed: string,
	birthday: string,
	uidOwner: string,
	id: string
}

@Injectable()
export class PetService {
	private pet: pet

	constructor() {

	}

	setPet(pet: pet){
		this.pet = pet
	}

	getID() {
		return this.pet.id
	}

}