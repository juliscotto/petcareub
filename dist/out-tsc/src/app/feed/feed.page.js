import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { PetService } from '../pet.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
var FeedPage = /** @class */ (function () {
    function FeedPage(pets, router, qrScanner, _barcodeScanner, modalController, user, afAuth, afs) {
        this.pets = pets;
        this.router = router;
        this.qrScanner = qrScanner;
        this._barcodeScanner = _barcodeScanner;
        this.modalController = modalController;
        this.user = user;
        this.afAuth = afAuth;
        this.afs = afs;
        this.vetApproved = false;
        this.isOn = false;
        this.buttonText = 'Loading…';
        this.loading = true;
        this.options = {
            formats: 'QR_CODE',
        };
        this.products = [];
        this.pageTitle = "";
    }
    FeedPage.prototype.ngOnInit = function () {
        this.getUserData();
    };
    FeedPage.prototype.redirectPetPage = function (petid) {
        this.router.navigate(['/petprofile/', petid, this.vetApproved]);
    };
    FeedPage.prototype.age = function (birthDay) {
        var today = new Date();
        var birtDate = new Date(birthDay);
        var age = today.getFullYear() - birtDate.getFullYear();
        var m = today.getMonth() - birtDate.getMonth();
        if (m < 0 || (m == 0 && today.getDate() < birtDate.getDate())) {
            age--;
        }
        if (age == 0) {
            age = m;
            if (age > 1) {
                return age + " meses";
            }
            else {
                return age + " mes";
            }
        }
        else {
            if (age > 1) {
                return age + " años";
            }
            else {
                return age + " año";
            }
        }
    };
    FeedPage.prototype.scanQR = function () {
        var _this = this;
        this._barcodeScanner.scan(this.options).then(function (barcodeData) {
            if (barcodeData.cancelled) {
                console.log("User cancelled the action!");
                _this.buttonText = "Scan";
                _this.loading = false;
                return false;
            }
            console.log("Scanned successfully!");
            console.log(barcodeData["text"]);
            _this.presentModal(barcodeData["text"]);
        }, function (err) {
            console.log(err);
        });
    };
    FeedPage.prototype.readQR = function () {
        var _this = this;
        var ionApp = document.getElementsByTagName('ion-app')[0];
        this.qrScanner.prepare()
            .then(function (status) {
            if (status.authorized) {
                // camera permission was granted
                console.log("scanning");
                // start scanning
                var scanSub_1 = _this.qrScanner.scan().subscribe(function (text) {
                    console.log('Scanned something', text);
                    _this.qrScanner.hide();
                    ionApp.style.display = 'block'; // hide camera preview
                    scanSub_1.unsubscribe(); // stop scanning
                });
                // show camera preview
                window.document.querySelector('ion-app').classList.add('transparentBody');
                _this.qrScanner.show();
                ionApp.style.display = 'none';
                // wait for user to scan something, then the observable callback will be called
            }
            else if (status.denied) {
                // camera permission was permanently denied
                // you must use QRScanner.openSettings() method to guide the user to the settings page
                // then they can grant the permission from there
                ionApp.style.display = 'block';
            }
            else {
                // permission was denied, but not permanently. You can ask for permission again at a later time.
                ionApp.style.display = 'block';
            }
        })
            .catch(function (e) {
            console.log('Error is', e);
            ionApp.style.display = 'block';
        });
    };
    FeedPage.prototype.presentModal = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ModalPage,
                            componentProps: { data: data }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FeedPage.prototype.dismiss = function () {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true
        });
    };
    FeedPage.prototype.isLoggedIn = function () {
        return this.afAuth.authState.pipe(first()).toPromise();
    };
    FeedPage.prototype.getUserData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afAuth.authState.pipe(first()).toPromise()];
                    case 1:
                        user = _a.sent();
                        this.userID = user.uid;
                        this.userData = this.user.getUser(user.uid);
                        this.afs.collection('users').doc(user.uid).snapshotChanges().pipe(map(function (actions) {
                            var vetApproved = actions.payload.get('vetApproved');
                            return vetApproved;
                        })).subscribe(function (data) {
                            _this.vetApproved = data;
                            if (!_this.vetApproved) {
                                _this.userPets = _this.pets.getPetsList();
                                _this.pageTitle = "Mascotas";
                            }
                            else {
                                _this.userPets = _this.pets.getVetPetsList();
                                _this.pageTitle = "Pacientes";
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FeedPage = __decorate([
        Component({
            selector: 'app-feed',
            templateUrl: './feed.page.html',
            styleUrls: ['./feed.page.scss'],
        }),
        __metadata("design:paramtypes", [PetService,
            Router,
            QRScanner,
            BarcodeScanner,
            ModalController,
            UserService,
            AngularFireAuth,
            AngularFirestore])
    ], FeedPage);
    return FeedPage;
}());
export { FeedPage };
//# sourceMappingURL=feed.page.js.map