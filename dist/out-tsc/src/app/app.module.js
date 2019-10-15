import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import { PetService } from './pet.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { MedicalHistory } from './medicalhistory.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import "@firebase/auth";
import "@firebase/firestore";
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { ModalPageModule } from './modal/modal.module';
import { Ng2TelInputModule } from 'ng2-tel-input';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                AngularFireAuthModule,
                ModalPageModule,
                Ng2TelInputModule
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
                AngularFireAuth,
                NgxQRCodeModule,
                QRScanner,
                BarcodeScanner,
                ModalController
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map