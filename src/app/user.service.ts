import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'

interface user {
	fullname: string,
	email: string,
	vetApproved: boolean,
	vetcertificate: string,
	uid: string
}

@Injectable()
export class UserService {
	private user: user

	constructor(private afAuth: AngularFireAuth) {

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



}