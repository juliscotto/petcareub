import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import { PetService } from '../pet.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})


export class UploaderPage implements OnInit {
  genders = [{
    name: 'Macho',
    value: false
  }, {
    name: 'Hembra',
    value: false
  }];


	hide:boolean = false;

	namePet: string = ""
	gender: string = ""
	type: string = ""
	breed: string = ""
	birthday: string = ""
	id: string = ""
	uidOwner : string =""
	otherType : string = ""


  constructor(
  	public afstore: AngularFirestore,
	public pet: PetService,
	public alert: AlertController,
	public router: Router,
	public user: UserService,
	public afAuth: AngularFireAuth
) {}

selection(name: string) {
    this.genders.forEach(x => {
      if (x.name !== name) {
        x.value = !x.value
        this.gender = name
      }
    })
  }

  onChange(value){
  if(value=="other"){
  	this.hide=true;
	}else{
	this.hide=false;
	}
  
}





async registerPet(){
	if(this.type=="other"){
		this.type = this.otherType
	}else{
		this.type =this.type
	}
	const { namePet,gender, type, breed,birthday,id,uidOwner } = this
	const user = await this.isLoggedIn()
	try{
		
		    this.afstore.collection('pets').add({
			namePet,
			gender,
			type,
			breed,
			birthday,
			uidOwner : user.uid,
			id : this.afstore.createId()

		})

		this.pet.setPet({
				namePet,
				gender,
				type,
				breed,
				birthday,
				uidOwner,
				id
			})
		

		this.showAlert("Success!", "Mascota guardada")
		  
		

		 
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


  isLoggedIn() {
   return this.afAuth.authState.pipe(first()).toPromise();
}
 

  


  ngOnInit() {
  }

}
