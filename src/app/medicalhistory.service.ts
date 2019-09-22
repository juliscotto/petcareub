import { Injectable } from '@angular/core'
import { AngularFireList } from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { PetService } from './pet.service';

interface medicalhistory {
	vetName: string,
	diagnosis: string,
	comments: string,
	petID: string,
	fileUri: string,
	id: string
}

@Injectable()
export class MedicalHistory {
	private medicalhistory: medicalhistory
	
	data: any;
	entryData


	constructor(
		public user: UserService, 
		public afs: AngularFirestore) {
	
	}
	
	
	getMedicalHistoryEntries(petID: any) {
		const entries = this.afs.collection<any>("medicalhistoryentries", ref =>
			ref.where('petID', '==', petID))
		this.entryData = entries.valueChanges();
		return this.entryData
	}
	

	

	setMedicalHistory(medicalhistory: medicalhistory) {
		this.medicalhistory = medicalhistory
	}

	getID() {
		return this.medicalhistory.id
	}

}