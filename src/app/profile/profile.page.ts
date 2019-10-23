import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth'
import { first, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
	fullname: string = ""
	email: string = ""
	password: string = ""
	cpassword: string = ""
	phoneNumberAreaCode: string = ""
	phoneNumber: string = ""
	vetApproved: boolean = false
	vetcertificate: string = ""

	message: string = ""
	hide: boolean = false
	isEditing: boolean = true;

	userData;
	checked: boolean = false;
	editMessage: string = "Editar Perfil";

	constructor(
		public user: UserService ,
		private afAuth: AngularFireAuth,
		public alert: AlertController
		) { }

	async ngOnInit() {

		this.userData =  await this.user.getUserData();

		this.userData.subscribe(async (user) => {
			this.userData = await user
			this.fullname = this.userData['fullname'];
			this.email = this.userData['email'];
			this.password = this.userData['password'];
			if (this.userData['telephoneNumber']) {
				var splitted = this.userData['telephoneNumber'].split("-", 2);
				this.phoneNumberAreaCode = splitted[0].split("+")[1];
				this.phoneNumber = splitted[1];
			}
			this.vetApproved = this.userData['vetApproved'];
			if (this.vetApproved == true) {
				this.checked = true;
				this.hide = true;	
				this.vetcertificate = this.userData['vetcertificate'];
			}else{
				this.checked = false;
				this.hide = false;	
			}

		})
			


		
	}

	async reload(){
		this.userData = await this.user.getUserData();
		this.userData.subscribe(async (user) => {
			this.userData = await user
			this.fullname = this.userData['fullname'];
			this.email = this.userData['email'];
			this.password = this.userData['password'];
			if (this.userData['telephoneNumber']) {
				var splitted = this.userData['telephoneNumber'].split("-", 2);
				this.phoneNumberAreaCode = splitted[0].split("+")[1];
				this.phoneNumber = splitted[1];
			}
			if (this.userData['vetApproved'] == true) {
				this.checked = true;
				this.hide = true;
				this.vetcertificate = this.userData['vetcertificate'];
			} else {
				this.checked = false;
				this.hide = false;
			}

		})
	}

	
	addValue(e): void {
		var isChecked = e.currentTarget.checked;
		if (this.checked) {
			this.hide = false
			this.vetcertificate = "";
		} else {
			this.hide = true
		}

	}

	editProfile(){
		if (this.isEditing) {
			this.isEditing = false
			this.editMessage = "Cancelar"
		} else {
			this.isEditing = true
			this.editMessage = "Editar Perfil"
			this.reload();
		}
		
	}

	async saveChanges(){
		const telephoneNumber = "+" + this.phoneNumberAreaCode + "-" + this.phoneNumber;
		console.log(this.password)
		if (this.password) {
			if (this.password !== null && this.password !== '') {
				if (this.password !== this.cpassword) {
					this.showAlert("Error", "Passwords don't match")
					return console.error("Passwords don't match!")
				}
			}
		}
		this.user.updateUser(this.fullname, this.email, telephoneNumber, this.vetcertificate, this.password)

		const user = await this.afAuth.authState.pipe(first()).toPromise();
		if (user.email !== this.email) {
			this.showAlert("Verifique email", "Se ha enviado un email para verificar el nuevo email");
		}
		this.reload();
		this.editProfile();
	}

	async prueba() {
		const user = await this.afAuth.authState.pipe(first()).toPromise();

		console.log(user.emailVerified)
	}

	ifVetAlert(){
		if (!this.isEditing) {
			if (this.vetApproved) {
				this.showAlert("Alerta", "si deasea cambiar su matricula u otra consulta, contacte admins")
			}
		}
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
