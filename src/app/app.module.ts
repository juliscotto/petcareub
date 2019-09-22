import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import firebaseConfig from './firebase'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import { PetService } from './pet.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Subject } from 'rxjs';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { MedicalHistory } from './medicalhistory.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { AngularFireStorageModule } from "@angular/fire/storage";
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),

    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
    UserService,
    PetService,
    AngularFireDatabase,
    AngularFirestore,
    AngularFireStorage,
    FilePath,
    FileChooser,
    IOSFilePicker,
    File,
    MedicalHistory,
    FileOpener,
    FileTransfer,
    DocumentViewer,
    Platform,
    AngularFireAuth


  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
