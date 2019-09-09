import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	fullname: string = ""
	email: string = ""
	password: string = ""
	vetApproved: boolean = false
	vetcertificate:string = ""

	
	constructor(
		public afAuth: AngularFireAuth, 
		public router: Router,
		public user: UserService	
		)
		{ }
	ngOnInit() { }

	async login() {
		const { fullname, email, password, vetApproved, vetcertificate} = this
		try {
			const res =await this.afAuth.auth.signInWithEmailAndPassword(email, password)
		

			if(res.user) {
				this.user.setUser({
					fullname,
					email,
					vetApproved,
					vetcertificate,
					uid: res.user.uid
				})
				this.router.navigate(['/tabs'])
			}
		} catch(err) {
			console.dir(err)
		}
	}

}
