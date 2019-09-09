import { Injectable } from '@angular/core'
import {  AngularFireList } from 'angularfire2/database'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

interface pet {
	namePet: string,
	gender: string,
	type: string,
	breed: string,
	birthday: string,
	uidOwner: string,
	idVet : string,
	id: string
}

@Injectable()
export class PetService {
	private pet: pet
	//private user: firebase.User;

	//pets: AngularFireList<pet[]> = null;
	userId: string
	data: any;
	petData


	constructor(
		public user: UserService, 
		public afs: AngularFirestore) {
	
	}
	
	
	getPetsList() {
		const pets = this.afs.collection<any>("pets", ref =>
			ref.where('uidOwner', '==', this.user.getUID()))
		this.petData = pets.valueChanges();
		return this.petData
	}

	getPet(petID: any) {
		const pets = this.afs.collection<any>("pets", ref =>
			ref.where('id', '==', petID))
		this.petData = pets.valueChanges();
		return this.petData
	}
	

	 /*getPetsList() {
		 let posts = [];
		 this.afAuth.authState.subscribe(user => {
			 this.user = user;
			
			 this.afstore.collection<any>("pets", ref => ref.where('uidOwner', '==', this.user.uid)).valueChanges().subscribe(data => { 
				 posts.push(data);
			 })


			 //this.afstore.collection<any>("pets", ref => ref.where('uidOwner', '==', this.user.uid)).valueChanges()
		 });

		 
		 return posts

		 
		 
		
		
		
	}*/

	setPet(pet: pet){
		this.pet = pet
	}

	getID() {
		return this.pet.id
	}

}