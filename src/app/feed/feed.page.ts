import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { IonicModule } from 'ionic-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
	userPets
	constructor(
		private pets: PetService,
		public router: Router
		) {
		
		this.userPets = this.pets.getPetsList()
		
		}



  ngOnInit() {
	  
	  
  }

	redirectPetPage(petid: any) {
		this.router.navigate(['/petprofile/' + petid])
	}
  
  age(birthDay: any){
	  const today = new Date();
	  const birtDate = new Date(birthDay);
	  let age = today.getFullYear() - birtDate.getFullYear();
	  const m = today.getMonth() - birtDate.getMonth();

	  if (m < 0 || (m == 0 && today.getDate() < birtDate.getDate())) {
		  age--;
	  }

	  

	  if (age == 0){
		  age = m
		  if (age > 1) {
			  return age + " meses";
		  } else {
			  return age + " mes";
		  }
		 
	  }else{
		  if (age > 1) {
			  return age + " años";
		  }else{
			  return age + " año";
		  }
	  }

	  
  }


	
}
