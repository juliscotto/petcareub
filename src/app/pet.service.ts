import { Injectable } from '@angular/core'
import { AngularFireList } from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { first, tap, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';


import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

interface pet {
	namePet: string,
	gender: string,
	type: string,
	breed: string,
	birthday: string,
	uidOwner: string,
	idVet : string,
	id: string,

}

@Injectable()
export class PetService {
	private pet: pet
	//private user: firebase.User;

	//pets: AngularFireList<pet[]> = null;
	userId: string
	data: any;
	petData
	users: any;
	itemspet: any;
	datapet: any;

	private itemsCollection: AngularFirestoreCollection<any>;
	items: Observable<any[]>;
	countItems = 0;

	constructor(
		public user: UserService, 
		public afs: AngularFirestore
		) {
	
	}

	getPetMedicalHistories(petID: any) {

		this.itemsCollection = this.afs.collection<any>('medicalhistoryentries', ref =>
			ref.where('petID', '==', petID))
		this.petData = this.itemsCollection.snapshotChanges()
			.map(actions => {
				this.countItems = actions.length;
				return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
			});

		return this.petData
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
	

	getPetData(petID: any) {
		let resultID;
		
		this.itemspet = this.afs.collection<any>('pets', ref =>
			ref.where('id', '==', petID))

		this.datapet = this.itemspet.snapshotChanges()
			.map(actions => {
				this.countItems = actions.length;

				return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
			});


      
		return this.datapet;
		
	}

	updatePetVet(_id: string, _value: string) {
		let doc = this.afs.collection<any>('pets', ref => ref.where('id', '==', _value));
		doc.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data();
				const iddoc = a.payload.doc.id;
				return { iddoc, ...data };
			}))).subscribe((pets) => {
				const id: Array<string> = pets.reduce((prevValue, pet) => {
					return pet.iddoc;
				}, []);
				this.afs.doc(`pets/${id}`).update({ idVet: _id });
				
			})
		
		
	}

	

	setPet(pet: pet){
		this.pet = pet
	}

	getID() {
		return this.pet.id
	}

	

	getVetPetsList() {
		const pets = this.afs.collection<any>("pets", ref =>
			ref.where('idVet', '==', this.user.getUID()))
		this.petData = pets.valueChanges();
		return this.petData
	}

	deleteAllMedialEntries(_id: string) {
		let doc = this.afs.collection<any>('medicalhistoryentries', ref => ref.where('petID', '==', _id));
		doc.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data();
				const iddoc = a.payload.doc.id;
				return { iddoc, ...data };
			}))).subscribe((pets) => {
				const id: Array<string> = pets.reduce((prevValue, pet) => {
					this.afs.doc(`medicalhistoryentries/${pet.iddoc}`).delete(); 
				}, []);
				

			})


	}

	updatePetData(id: string, namePet: string, gender: string, type: string, breed: string, birthday: string) {

		this.afs.doc(`pets/${id}`).update({ namePet: namePet, gender: gender, 
			type: type, breed: breed, birthday: birthday });
	}

	



}