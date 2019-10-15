import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { PetService } from '../pet.service';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular'

@Component({
	selector: 'modal',
	templateUrl: './modal.page.html',
	styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

	userPets
	userData
	userID
	userOwnerData
	petID: any;
	uidOwner: any;
	uidOwnerResult: any;

	constructor(
		private nav: NavController,
	 	private modalCtrl: ModalController,
		public navParams: NavParams,
		public user: UserService,
		public pets: PetService,
		public afAuth: AngularFireAuth,
		public alert: AlertController
		) {
		this.petID = navParams.get('data')

		}

	ngOnInit() {
		this.userPets = this.pets.getPet(this.petID)

		console.log(this.petID)
		this.pets.getPetData(this.petID).subscribe((pets) => {
			const uid: Array<string> = pets.reduce((prevValue, pet) => {
				return pet.uidOwner;
			}, []);
			console.log(uid)
			this.uidOwner = uid;
			this.userOwnerData = this.user.getUser(this.uidOwner)
			console.log(this.userOwnerData)
		})

		
		this.getUserData()
		
	}

	closeModal() {
		this.modalCtrl.dismiss();
	}

	age(birthDay: any) {
		const today = new Date();
		const birtDate = new Date(birthDay);
		let age = today.getFullYear() - birtDate.getFullYear();
		const m = today.getMonth() - birtDate.getMonth();

		if (m < 0 || (m == 0 && today.getDate() < birtDate.getDate())) {
			age--;
		}



		if (age == 0) {
			age = m
			if (age > 1) {
				return age + " meses";
			} else {
				return age + " mes";
			}

		} else {
			if (age > 1) {
				return age + " años";
			} else {
				return age + " año";
			}
		}


	}

	async getUserData() {
		const user = await this.afAuth.authState.pipe(first()).toPromise();
		this.userID = user.uid
		this.userData = this.user.getUser(user.uid)
	}

	addPetToVet(){
		this.pets.updatePetVet(this.userID, this.petID);
		this.showAlert("ok!", "Mascota guardada")
		
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
