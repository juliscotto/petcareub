import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { PetService } from '../pet.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { IonicModule } from 'ionic-angular';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonicPageModule } from 'ionic-angular';

import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})

export class FeedPage implements OnInit {
	userPets
	userData
	userID
	vetApproved ;
	petID: any;
	uidOwner: any;

	isOn = false;
	buttonText = 'Loading…';
	loading = true;
	options = {
	formats: 'QR_CODE',
	//prompt : “Place the code in the center of the square.”+ “\n”+ " It will be scanned automatically",
	}

	products: any[] = [];
	selectedProduct: any;
	pageTitle = "";
	
	constructor(
		private pets: PetService,
		public router: Router,
		private qrScanner: QRScanner,
		private _barcodeScanner: BarcodeScanner,
		public modalController: ModalController,
		public user:  UserService,
		public afAuth: AngularFireAuth,
		public afs: AngularFirestore

		) {

		

		
		

	}





  ngOnInit() {
	  
	  this.getUserData()

	 
	  
  }

	redirectPetPage(petid: any) {
		this.router.navigate(['/petprofile/' , petid , this.vetApproved])
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

	 public scanQR() {
		
		this._barcodeScanner.scan(this.options).then((barcodeData) => {

			if (barcodeData.cancelled) {
				console.log("User cancelled the action!");
				this.buttonText = "Scan";
				this.loading = false;
				return false;
			}
			console.log("Scanned successfully!");
			console.log(barcodeData["text"]);
			this.presentModal(barcodeData["text"]);
			


			

		}, (err) => {
			console.log(err);
		});
	}

	readQR() {
		let ionApp = document.getElementsByTagName('ion-app')[0];
		this.qrScanner.prepare()
			.then((status: QRScannerStatus) => {

				if (status.authorized) {
					// camera permission was granted
					console.log("scanning")

					// start scanning
					let scanSub = this.qrScanner.scan().subscribe((text: string) => {
						console.log('Scanned something', text);

						this.qrScanner.hide(); 
						ionApp.style.display = 'block';// hide camera preview
						scanSub.unsubscribe(); // stop scanning
					});

					// show camera preview
					window.document.querySelector('ion-app').classList.add('transparentBody')
					this.qrScanner.show();
					ionApp.style.display = 'none';

					// wait for user to scan something, then the observable callback will be called

				} else if (status.denied) {
					// camera permission was permanently denied
					// you must use QRScanner.openSettings() method to guide the user to the settings page
					// then they can grant the permission from there
					ionApp.style.display = 'block';
				} else {
					// permission was denied, but not permanently. You can ask for permission again at a later time.
					ionApp.style.display = 'block';
				}
			})
			.catch((e: any) => { 
				console.log('Error is', e); 
				ionApp.style.display = 'block'; });
	}

	async presentModal(data: any) {
		const modal = await this.modalController.create({
			component: ModalPage,
			componentProps: { data}
		});

		return await modal.present();

		
	}

	dismiss() {
		// using the injected ModalController this page
		// can "dismiss" itself and optionally pass back data
		this.modalController.dismiss({
			'dismissed': true
		});
	}

	isLoggedIn() {
		return this.afAuth.authState.pipe(first()).toPromise();
	}


	async getUserData() {
		const user = await this.afAuth.authState.pipe(first()).toPromise();
		this.userID = user.uid
		this.userData = this.user.getUser(user.uid)

		this.afs.collection<any>('users').doc(user.uid).snapshotChanges().pipe(
			map(actions => {
				const vetApproved = actions.payload.get('vetApproved');
				return vetApproved;
			})
		).subscribe((data) => {
			this.vetApproved = data;
			
			if (!this.vetApproved) {
				this.userPets = this.pets.getPetsList()
				this.pageTitle = "Mascotas"
			} else {
				this.userPets = this.pets.getVetPetsList()
				this.pageTitle = "Pacientes"
			}
			
		});


	}

	

	
}
