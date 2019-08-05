import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'

import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	
	email: string = ""
	password: string = ""
	cpassword: string = ""


	constructor(
		public afAuth: AngularFireAuth,
		public alert: AlertController		
		) { }

	ngOnInit() {
	}

	async register(){
		const { email, password, cpassword } = this
		if(password !== cpassword) {
			this.showAlert("Error", "Passwords don't match")
			return console.error("Passwords don't match!")
		}

		try{
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			console.log(res)
			this.showAlert("Success!", "Walcome")
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
