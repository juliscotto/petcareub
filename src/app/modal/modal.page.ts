import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { PetService } from '../pet.service';
import { UserService } from '../user.service';

@Component({
	selector: 'modal',
	templateUrl: './modal.page.html',
	styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

	userPets
	userData
	petID: any;
	uidOwner: any;
	uidOwnerResult: any;

	constructor(
		private nav: NavController,
	 	private modalCtrl: ModalController,
		public navParams: NavParams,
		public user: UserService,
		public pets: PetService) {
		this.petID = navParams.get('data')
		}

	ngOnInit() {
		this.userPets = this.pets.getPet(this.petID)

		console.log(this.petID)
		this.pets.getPetuidOwner(this.petID).subscribe((pets) => {
			const uid: Array<string> = pets.reduce((prevValue, pet) => {
				return pet.uidOwner;
			}, []);
			console.log(uid)
			this.uidOwner = uid;
			this.userData = this.user.getUser(this.uidOwner)
			console.log(this.userData)
		})

		

		
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

}
