import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../pet.service';
import { Router } from '@angular/router';
import { IonicModule } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'
import { ToastController } from 'ionic-angular/components/toast/toast-controller'
import { InAppBrowser } from '@ionic-native/in-app-browser'; 
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular'
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NgxQRCodeModule } from 'ngx-qrcode2';




@Component({
  selector: 'app-petprofile',
  templateUrl: './petprofile.page.html',
  styleUrls: ['./petprofile.page.scss'],
})



export class PetprofilePage implements OnInit {
	userPets
	medicalHistories
	petID: string = ""

	docID: string = ""
	files: Observable<any[]>;

	private itemsCollection: AngularFirestoreCollection<any>;
	items: Observable<any[]>;
	countItems = 0;

	qr_data: string = ""

	created_code = {};

	constructor(
		private route: ActivatedRoute,
		private pets: PetService,
		public router: Router,
		private db: AngularFireDatabase,
		private afStorage: AngularFireStorage,
		public afAuth: AngularFireAuth,
		private platform: Platform, 
		private file: File, 
		private ft: FileTransfer,
		private fileOpener: FileOpener, 
		private document: DocumentViewer,
		public afs: AngularFirestore,
		public alertController: AlertController,
		public qrController: NgxQRCodeModule
		
		) { 

		
		
	}

  ngOnInit() {
	  this.route.params.subscribe(params =>
		  this.petID = params.petId);
	

	  this.userPets = this.pets.getPet(this.petID)

	  

	  this.medicalHistories = this.pets.getPetMedicalHistories(this.petID)

	  this.qr_data = this.petID;


	  this.created_code = this.qr_data;


  
  }


	downloadAndOpenPdf(fileURI: any) {
		let downloadUrl = fileURI;
		let path = this.file.dataDirectory;
		const transfer = this.ft.create();

		transfer.download(downloadUrl, path + 'preview.pdf').then((entry) => {
			let url = entry.toURL();

			if (this.platform.is('ios')) {
				this.document.viewDocument(url, 'application/pdf', {});
			} else {
				this.fileOpener.open(url, 'application/pdf')
					.then(() => console.log('File is opened'))
					.catch(e => console.log('Error opening file', e));
			}
		});
	}
	
	
	async deleteMedicalHistory(idMedicalHistoryEntry: any, fileURI: any) {
		const alert = await this.alertController.create({
			header: 'Estas seguro que queres eliminar esta entrada?',
			message: 'Esta accion no se podra deshacer',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						
					}
				}, {
					text: 'Si',
					handler: () => {
						

						this.afs.doc(`medicalhistoryentries/${idMedicalHistoryEntry.$key}`).delete();
						this.afStorage.storage.refFromURL(idMedicalHistoryEntry.fileUri).delete();
						
						
						
				
					}
				}
			]
		});

		await alert.present();


		
	}



	

	isLoggedIn() {
		return this.afAuth.authState.pipe(first()).toPromise();
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

	createCode() {
		
	}


}


