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
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserService } from './user.service';
import { PetService } from './pet.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore,AngularFirestoreModule } from '@angular/fire/firestore';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Subject } from 'rxjs';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  	BrowserModule, 
  	IonicModule.forRoot(), 
  	AppRoutingModule,
  	AngularFireModule.initializeApp(firebaseConfig),
  	AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    PetService,
    AngularFireDatabase,
    AngularFirestore,
    FilePath,
    FileChooser,
    IOSFilePicker

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
