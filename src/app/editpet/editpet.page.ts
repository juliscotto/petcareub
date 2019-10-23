import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-editpet',
  templateUrl: './editpet.page.html',
  styleUrls: ['./editpet.page.scss'],
})
export class EditpetPage implements OnInit {
	genders = [{
		name: 'Macho',
		value: true
	}, {
		name: 'Hembra',
		value: true
	}];

	petID: string = ""
	namePet: string = ""
	gender: string = ""
	type: string = ""
	breed: string = ""
	birthday: string = ""
	otherType: string = ""
	docID: string = ""

	hide: boolean = false;
	petData
	isChecked: boolean = false;


	constructor(
		public pets: PetService,
		private route: ActivatedRoute,
		private alertController: AlertController) { 


	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.petID = params.petID;
		});

		
		this.petData = this.pets.getPetData(this.petID);
	

		this.petData.subscribe(async (pets) => {
			this.petData = await pets
			this.docID = this.petData[0]['$key']
			this.namePet = this.petData[0]['namePet']
			this.selection(this.petData[0]['gender'])
			this.type = this.petData[0]['type']
			if (this.type != "perro" && this.type != "gato" && this.type != "conejo" && this.type != "ave" && this.type != "hamster" && 
				this.type != "reptil" && this.type != "pez") {
				this.hide = true;
				this.otherType = this.type
				this.type = "other";
				
			}else{
				this.hide = false;
				this.otherType = "";
			}
			
			this.breed = this.petData[0]['breed']
			this.birthday = this.petData[0]['birthday']


		})
	}

	selection(name: string) {
		this.genders.forEach(x => {
			if (x.name !== name) {
				x.value = !x.value
				this.gender = name
				
			
			}
		})
	}

	onChange(value) {
		if (value == "other") {
			this.hide = true;
		} else {
			this.hide = false;
		}

	}



	saveChanges(){
		if (this.type == "other") {
			this.type = this.otherType
		} else {
			this.type = this.type
		}

		this.pets.updatePetData(this.docID, this.namePet, this.gender, this.type, this.breed, this.birthday)
		this.showAlert("Cambios guardados correctamente", "yay!")
		this.selection(this.gender)
	}

	async showAlert(header: string, message: string) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ["Ok"]
		})

		await alert.present()
	}

	



}
