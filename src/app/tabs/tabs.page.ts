import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { UserService } from '../user.service';
import { FeedPage } from '../feed/feed.page';
import { PetService } from '../pet.service';
import { AngularFirestore } from '@angular/fire/firestore'
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
import { AppRoutingPreloaderService } from '../AppRoutingPreloaderService.page';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
	@ViewChild('tabs') tabs: IonTabs

	userData
	vetApproved: boolean = false;

	constructor(
		private pets: PetService,
		public router: Router,
		private qrScanner: QRScanner,
		private _barcodeScanner: BarcodeScanner,
		public modalController: ModalController,
		public user: UserService,
		public afAuth: AngularFireAuth,
		public afs: AngularFirestore,
		private routingService: AppRoutingPreloaderService
		) { 
		this.feedPreLoad()
		}

	async ngOnInit() {
		this.tabs.select('feed')

		this.userData = await this.user.getUserData();

		this.userData.subscribe(async (data) => {
			await data;
			this.vetApproved = data['vetApproved'] ;

		});
	}

	scanQR(){
		let feedpage = new FeedPage(this.pets, this.router, this.qrScanner, this._barcodeScanner, this.modalController, this.user,
			this.afAuth, this.afs);
		feedpage.scanQR();
	}

	async feedPreLoad() {
		await this.routingService.preloadRoute('feed');
	}
}
