import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	email: string = ""
	password: string = ""
	
	constructor(public afAuth: AngularFireAuth) { }
	ngOnInit() { }

	async login() {
		const { email, password} = this
		try {
			const res =await this.afAuth.auth.signInWithEmailAndPassword(email, password)
		} catch(err) {
			console.dir(err)
		}
	}

}
