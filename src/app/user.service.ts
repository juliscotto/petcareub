import { Injectable, Pipe } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { first, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular'

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
		public afs: AngularFirestore,
		public alert: AlertController) {

	}

	setUser(user: user){
		this.user = user
	}

	getUID() {
		if (!this.user) {
			if (this.afAuth.auth.currentUser) {
				const user = this.afAuth.auth.currentUser
				if (this.user!=null) {
					this.setUser({
						fullname: this.user.fullname,
						email: user.email,
						phoneNumber: user.phoneNumber,
						vetApproved: this.user.vetApproved,
						vetcertificate: this.user.vetcertificate,
						uid: user.uid

					})
					return user.uid
				}else{
					throw new Error("User not logged in")
				}
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

	async getUserData() {
		const user = await this.afAuth.authState.pipe(first()).toPromise();

		this.userData = this.getUser(user.uid)

		const itemsCollection = this.afs.collection<any>('users').doc(user.uid)
		const userdata = itemsCollection.snapshotChanges().pipe(
			map(actions => {
				return ({ $key: actions.payload.id, ...actions.payload.data() });
			}));

		return userdata;
	}

	async updateUser(_fullname: string, _email: string, _telephoneNumber: string, _vetcertificate: string, password: string) {
		const user = await this.afAuth.authState.pipe(first()).toPromise();


		if (user.email !== _email) {
			user.updateEmail(_email).then(function() {
				console.log("email updated")
				user.sendEmailVerification();
			}).catch(function(error) {
				console.log(error)
			});
		}

		if (password) {
			if (password !== null && password !== '') {
				user.updatePassword(password).then(function() {
					console.log("password updated")
				}).catch(function(error) {
					console.log(error)
				});
			}
		}


		this.afs.doc(`users/${user.uid}`).update({ fullname: _fullname, email: _email, telephoneNumber: _telephoneNumber, 
			vetcertificate: _vetcertificate
		});
		this.showAlert("Cambios Guardados", "yay!");

	}

	async showAlert(header: string, message: string) {
		const alert = await this.alert.create({
			header,
			message,
			buttons: ["Ok"]
		})

		await alert.present()
	}

	async logout(): Promise<any> {
		return this.afAuth.auth.signOut();
	}

	async deleteUser() {
		const user = await this.afAuth.authState.pipe(first()).toPromise();
		
		this.afs.collection<any>('users').doc(user.uid).delete();

		user.delete();



	}


}