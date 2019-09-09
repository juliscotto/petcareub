import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../pet.service';
import { Router } from '@angular/router';
import { IonicModule } from 'ionic-angular';

@Component({
  selector: 'app-petprofile',
  templateUrl: './petprofile.page.html',
  styleUrls: ['./petprofile.page.scss'],
})
export class PetprofilePage implements OnInit {
	userPets
	petID: string = ""

	constructor(
		private route: ActivatedRoute,
		private pets: PetService,
		public router: Router) { 
		
		
	}

  ngOnInit() {
	  this.route.params.subscribe(params =>
		  this.petID = params.petId);
	

	  this.userPets = this.pets.getPet(this.petID)

  }

	redirectMedicalHistory() {
		this.router.navigate(['/uploadmedicalhistory/' + this.petID])
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
