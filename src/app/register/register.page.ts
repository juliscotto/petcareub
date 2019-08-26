import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'

import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';

import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	
	fullname: string = ""
	email: string = ""
	password: string = ""
	cpassword: string = ""


	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public alert: AlertController,
		public router: Router	

		) { }

	ngOnInit() {
	}

	
	async register(){
		const { fullname,email, password, cpassword } = this
		if(password !== cpassword) {
			this.showAlert("Error", "Passwords don't match")
			return console.error("Passwords don't match!")
		}

		try{
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			console.log(res)
			

			this.afstore.doc(`users/${res.user.uid}`).set({
				fullname,
				email
			})

			this.user.setUser({
					fullname,
					email,
					uid: res.user.uid
				})
			

			this.showAlert("Success!", "Welcome")
			this.router.navigate(['/tabs'])
		} catch(error){
			console.dir(error)
			this.showAlert("Error", error.message)
		}
		
	}

	async showAlert(header: string, message: string){
		const alert = await this.alert.create({
			header,
			message,
			buttons: ["Ok"]
		})

		await alert.present()
	}

}
