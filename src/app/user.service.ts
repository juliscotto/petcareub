import { Injectable, Pipe } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'


interface user {
	fullname: string,
	email: string,
	phoneNumber: string,
	vetApproved: boolean,
	vetcertificate: string,
	uid: string
}


@Injectable()
export class UserService {
	private user: user
	userData
	private itemsCollection: AngularFirestoreCollection<any>;
	constructor(
		private afAuth: AngularFireAuth,
		public afs: AngularFirestore) {

	}

	setUser(user: user){
		this.user = user
	}

	getUID() {
		if (!this.user) {
			if (this.afAuth.auth.currentUser) {
				const user = this.afAuth.auth.currentUser
				this.setUser({
					fullname: this.user.fullname,
					email: user.email,
					phoneNumber: user.phoneNumber,
					vetApproved: this.user.vetApproved,
					vetcertificate: this.user.vetcertificate,
					uid: user.uid

				})
				return user.uid
			} else {
				throw new Error("User not logged in")
			}
		} else {
			return this.user.uid
		}
	}

	
	getUser(userID: any) {
		
		return this.afs.collection<any>('users').doc(userID).valueChanges()
	
		
		
		
	}



}