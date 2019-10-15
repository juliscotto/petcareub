import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../pet.service';
import { Router } from '@angular/router';
import { IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { MedicalHistory } from '../medicalhistory.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'
import { AngularFireDatabase } from '@angular/fire/database';
import { map, filter, switchMap, finalize, first } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import 'rxjs/add/observable/of';
import { AngularFireAuth } from '@angular/fire/auth'



@Component({
  selector: 'app-uploadmedicalhistory',
  templateUrl: './uploadmedicalhistory.page.html',
  styleUrls: ['./uploadmedicalhistory.page.scss'],
})
export class UploadmedicalhistoryPage implements OnInit {
	petID: string = ""
	returnpath: string = "";
	vetApproved:boolean = false;
	vetName: string = "";
	diagnosis: string = "";
	comments: string = "";
	fileUri: string = "";
	id: string

	userData

	URLPublica: string
	uploadPercent: Observable<number>;
	downloadURL: Observable<string>;

	constructor(
		private route: ActivatedRoute,
		private pets: PetService,
		public router: Router,
		private filePath: FilePath,
		private fileChooser: FileChooser,
		private filePicker: IOSFilePicker,
		private file: File,
		private medicalhistory: MedicalHistory,
		public afstore: AngularFirestore,
		public alert: AlertController,
		private afStorage: AngularFireStorage,
		private db: AngularFireDatabase,
		public platform: Platform,
		public user: UserService,
		public afAuth: AngularFireAuth

		) {





		 }

	async ngOnInit() {

		this.route.params.subscribe(params => {
			this.petID = params.petId;
			this.vetApproved = (params.vetApproved == "true");
			this.updateVetName()

		});
		
	

	}

	


	upload() {

		this.platform.ready().then(() => {
			let platforms = this.platform.platforms();
			if (this.platform.is('android') && !platforms.includes("mobileweb")) {
			
				this.fileChooser.open().then((uri) => {
					alert(uri);

					this.filePath.resolveNativePath(uri).then(filePath => {
						alert(filePath);
						let dirPathSegments = filePath.split('/');
						let fileName = dirPathSegments[dirPathSegments.length - 1];
						dirPathSegments.pop();
						let dirPath = dirPathSegments.join('/');
						this.file.readAsArrayBuffer(dirPath, fileName).then(async (buffer) => {
							await this.upload2(buffer, fileName);
						}).catch((err) => {
							alert(err.toString());
						});
					});
				});


			} else if (this.platform.is('ios') && !platforms.includes("mobileweb")) {
				console.log(platforms)
				this.filePicker.pickFile()
					.then(uri => { 
						alert(uri);
						let correctPath = uri.substr(0, uri.lastIndexOf('/') + 1);
						let currentName = uri.substring(uri.lastIndexOf('/') + 1);
								
						this.file.readAsArrayBuffer("file:///" + correctPath, currentName).then(async (buffer) => {
							await this.upload2(buffer, currentName);
								}).catch((err) => {
									alert(err.toString());
								});
						
					});
								
					
			} else {
				
				alert("Esta funcion, por el momento, solo esta disponible para aplicacion movil")
			}
			
		});
	}

	async upload2(buffer, name){

		let blob = new Blob([buffer], { type: "application/pdf" });

		let date: Date = new Date();  

		const fileRef = this.afStorage.ref(`medicalhistoryentries/${this.petID}/${date}/${name}`);
		const uploadTask = this.afStorage.ref(`medicalhistoryentries/${this.petID}/${date}/${name}`).put(blob);

		// observe percentage changes
		this.uploadPercent = uploadTask.percentageChanges();
		// get notified when the download URL is available
		uploadTask.snapshotChanges().pipe(
			finalize(() =>  fileRef.getDownloadURL().subscribe(
				(value => this.fileUri = value)))
		)
			.subscribe()


		
		
		/*this.afStorage.ref(`medicalhistoryentries/${this.petID}/${date}/${name}`).getDownloadURL().toPromise().then((url) => {
			this.fileUri = url;
			alert(url);
		}).catch((error) => {
			alert(JSON.stringify(error))
		})*/
		
	}

	
	async addNewMedicalEntry() {
		const { vetName, diagnosis, comments, petID, fileUri, id } = this


		try {


			this.afstore.collection('medicalhistoryentries').add({
				vetName,
				diagnosis,
				comments,
				fileUri,
				petID,
				date: Date(), 
				id: this.afstore.createId()

			})

			this.medicalhistory.setMedicalHistory({
				vetName,
				diagnosis,
				comments,
				petID,
				fileUri,
				date: Date(),
				id,
	
			})


			this.showAlert("Success!", "Entrada guardada")
			this.router.navigate(['/petprofile/', this.petID, this.vetApproved])	

			

		} catch (error) {
			console.dir(error)
			this.showAlert("Error", error.message)
		}

	}

	async showAlert(header: string, message: string) {
		const alert = await this.alert.create({
			header,
			message,
			buttons: ["Ok"]
		})

		await alert.present()
	}

	async getUserData() {
		const user = await this.afAuth.authState.pipe(first()).toPromise();

		const itemsCollection = this.afstore.collection<any>('users').doc(user.uid)
		const userdata = itemsCollection.snapshotChanges().pipe(
			map(actions => {
				return ({ $key: actions.payload.id, ...actions.payload.data() });
			}));

		
		
		return userdata;
	}

	async updateVetName(){
		if (this.vetApproved===true) {
			this.userData = await this.getUserData()

			this.userData.subscribe(async (data) => {
				await data;
				this.vetName = await data['fullname']
			});

		}
	}

	

	 
 }


