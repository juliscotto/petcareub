import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../pet.service';
import { Router } from '@angular/router';
import { IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';

@Component({
  selector: 'app-uploadmedicalhistory',
  templateUrl: './uploadmedicalhistory.page.html',
  styleUrls: ['./uploadmedicalhistory.page.scss'],
})
export class UploadmedicalhistoryPage implements OnInit {
	petID: string = ""
	returnpath: string = "";
	constructor(
		private route: ActivatedRoute,
		private pets: PetService,
		public router: Router,
		private filePath: FilePath,
		private fileChooser: FileChooser,
		private filePicker: IOSFilePicker

		) {
		 }

  ngOnInit() {
	  this.route.params.subscribe(params =>
		  this.petID = params.petId);
  }

	
	
	// Upload a file:
	

  upload(){
  	/*this.fileChooser.open().then((fileuri)=>{
  		this.filePath.resolveNativePath(fileuri).then(
  			(resolvenativepath)=>{
					this.returnpath = resolvenativepath;
  			})
  	})*/
	  this.filePicker.pickFile()
		  .then(uri => console.log(uri))
		  .catch(err => console.log('Error', err));
  }

	 
  }


