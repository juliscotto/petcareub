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

import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-petprofile',
  templateUrl: './petprofile.page.html',
  styleUrls: ['./petprofile.page.scss'],
})

export class PetprofilePage implements OnInit {
	userPets
	medicalHistories
	petID: string = ""
	files: Observable<any[]>;

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
		private document: DocumentViewer
		
		) { 

		
		
	}

  ngOnInit() {
	  this.route.params.subscribe(params =>
		  this.petID = params.petId);
	

	  this.userPets = this.pets.getPet(this.petID)

	  this.medicalHistories = this.pets.getPetMedicalHistories(this.petID)
  
  }


	downloadAndOpenPdf(fileURI: any) {
		console.log("julita " + fileURI)
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


}


