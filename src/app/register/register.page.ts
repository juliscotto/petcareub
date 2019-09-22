import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
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
	vetApproved: boolean = false
	vetcertificate:string = ""

	message: string = ""
	hide:boolean = false



	constructor(

		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public alert: AlertController,
		public router: Router	

		) { }

	ngOnInit() {
	}

	checked : boolean = false;
  	addValue(e): void {
    	var isChecked = e.currentTarget.checked;
    	if(this.checked){
    		this.hide = false
    	}else{
    		this.hide = true
    	}

  	}	
	
	async register(){
		const { fullname,email, password, cpassword, vetApproved, vetcertificate} = this
		if(password !== cpassword) {
			this.showAlert("Error", "Passwords don't match")
			return console.error("Passwords don't match!")
		}

		try{
			
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			console.log(res)
			

			this.afstore.doc(`users/${res.user.uid}`).set({
				fullname,
				email,
				vetApproved,
				vetcertificate
			})

			this.user.setUser({
					fullname,
					email,
					vetApproved,
					vetcertificate,
					uid: res.user.uid
				})

			if(this.checked){
				this.message ="Nos tomaremos un dias en comprobar la validez de su matricula."
			}else{
				this.message ="Bienvenido"
			}
			
			
			this.showAlert("Registro correcto", this.message)
			this.router.navigate(['/tabs'])
		} catch(error){
			console.dir(error)
			this.showAlert("Error", error.message)
		}
		
	}

	redirectLogin(){
		this.router.navigate(['/login'])
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
