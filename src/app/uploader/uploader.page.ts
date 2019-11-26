import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import { PetService } from '../pet.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'
import { File } from '@ionic-native/file/ngx';
import { map, filter, switchMap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

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
	uidOwner : string = ""
	idVet : string = ""
	otherType : string = ""
	uploadPercent: Observable<number>;
	pictureUri: string = "";
	imgSrc: string = "../assets/icon/subir.jpg";
	fileName: string = "";
	disableWait: boolean = false;

  constructor(
  	public afstore: AngularFirestore,
	public pet: PetService,
	public alert: AlertController,
	public router: Router,
	public user: UserService,
	public afAuth: AngularFireAuth,
	public actionsheetCtrl:  ActionSheetController,
	public platform: Platform,
	private camera: Camera,
	private afStorage: AngularFireStorage,
	private file: File
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

	async openeditprofile() {
		const actionSheet = await this.actionsheetCtrl.create({
			header: 'Option',
			cssClass: 'action-sheets-basic-page',
			buttons: [
				{
					text: 'Take photo',
					role: 'destructive',
					icon: !this.platform.is('ios') ? 'ios-camera-outline' : null,
					handler: () => {
						this.captureImage(false);
					}
				},
				{
					text: 'Choose photo from Gallery',
					icon: !this.platform.is('ios') ? 'ios-images-outline' : null,
					handler: () => {
						this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
					}
				},
			]
		});
		await actionSheet.present();
	}

	


	async captureImage(useAlbum: boolean) {
		this.disableWait = true;
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64 (DATA_URL):
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			console.log("imageData " + imageData)
			this.imgSrc = base64Image;

			let correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
			this.fileName = imageData.substring(imageData.lastIndexOf('/') + 1);
			this.disableWait = false;
			
			
			
			
		}, (err) => {
			// Handle error
		});

		

	}

	pickImage(sourceType) {
		this.disableWait = true;
		const options: CameraOptions = {
			quality: 100,
			sourceType: sourceType,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64 (DATA_URL):
			// let base64Image = 'data:image/jpeg;base64,' + imageData;
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			console.log("imageData " + imageData)
			this.imgSrc = base64Image;

			let correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
			this.fileName = imageData.substring(imageData.lastIndexOf('/') + 1);

			this.disableWait = false;
	

			

		}, (err) => {
				alert(err)
		});

	}

	async upload2(image, name) {


		let date: Date = new Date();

		const fileRef = this.afStorage.ref(`petsprofilepics/${this.id}/${date}/${name}`);
		const uploadTask = this.uploadImage(image, date, name)

		// observe percentage changes
		this.uploadPercent = uploadTask.percentageChanges();

		uploadTask.snapshotChanges().pipe(
			finalize(() => fileRef.getDownloadURL().subscribe(
				(value => {
					console.log(value)
					this.pictureUri = value;
					console.log("fileUIR: " + this.pictureUri)
					this.setPet()
				})))
		)
			.subscribe()

		

	}

	uploadImage(image: string, date: Date, name: string): any {
	
		let imageRef = this.afStorage.ref(`petsprofilepics/${this.id}/${date}/${name}`);
		return imageRef.putString(image, 'data_url');
	}

	


async registerPet(){
	if(this.type=="other"){
		this.type = this.otherType
	}else{
		this.type =this.type
	}
	this.id = this.afstore.createId();
	if (this.imgSrc != "") {
		this.upload2(this.imgSrc, this.fileName)
	}else{
		this.setPet()
	}
	
		
}

async setPet(){

	const { namePet, gender, type, breed, birthday, id, uidOwner, idVet, pictureUri } = this

	const user = await this.isLoggedIn()
	try {

		this.afstore.collection('pets').add({
			namePet,
			gender,
			type,
			breed,
			birthday,
			uidOwner: user.uid,
			idVet,
			id,
			pictureUri

		})

		this.pet.setPet({
			namePet,
			gender,
			type,
			breed,
			birthday,
			uidOwner,
			idVet,
			id,
			pictureUri
		})


		this.showAlert("Success!", "Mascota guardada")




	} catch (error) {
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
