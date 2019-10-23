import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AppRoutingPreloaderService } from '../AppRoutingPreloaderService.page';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	fullname: string = ""
	email: string = ""
	phoneNumber: string = ""
	password: string = ""
	vetApproved: boolean = false
	vetcertificate:string = ""

	
	constructor(
		public afAuth: AngularFireAuth, 
		public router: Router,
		public user: UserService,
		private routingService: AppRoutingPreloaderService,
		public alert: AlertController	
		)

		{ 
			this.feedPreLoad()
		}
	ngOnInit() { 

	}

	async login() {
		const { fullname, email, phoneNumber, password, vetApproved, vetcertificate } = this
		try {
			const res =await this.afAuth.auth.signInWithEmailAndPassword(email, password)
		

			if(res.user) {
				//if (res.user.emailVerified) {
					this.user.setUser({
						fullname,
						email,
						phoneNumber,
						vetApproved,
						vetcertificate,
						uid: res.user.uid
					})
					this.router.navigate(['/tabs'])
				/*}else{
					this.showAlert("Email no verificado", "Por favor, ingrese a su email para verifiar la cuenta");
				}*/
			}
		} catch(err) {
			this.showAlert("error", err)
		}
	}

	async feedPreLoad() {
		await this.routingService.preloadRoute('feed');
	}

	async showAlert(header: string, message: string) {
		const alert = await this.alert.create({
			header,
			message,
			buttons: ["Ok"]
		})

		await alert.present()
	}
}
