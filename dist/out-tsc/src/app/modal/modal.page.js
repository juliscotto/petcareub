import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { PetService } from '../pet.service';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
var ModalPage = /** @class */ (function () {
    function ModalPage(nav, modalCtrl, navParams, user, pets, afAuth, alert) {
        this.nav = nav;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.user = user;
        this.pets = pets;
        this.afAuth = afAuth;
        this.alert = alert;
        this.petID = navParams.get('data');
    }
    ModalPage.prototype.ngOnInit = function () {
        var _this = this;
        this.userPets = this.pets.getPet(this.petID);
        console.log(this.petID);
        this.pets.getPetData(this.petID).subscribe(function (pets) {
            var uid = pets.reduce(function (prevValue, pet) {
                return pet.uidOwner;
            }, []);
            console.log(uid);
            _this.uidOwner = uid;
            _this.userOwnerData = _this.user.getUser(_this.uidOwner);
            console.log(_this.userOwnerData);
        });
        this.getUserData();
    };
    ModalPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    ModalPage.prototype.age = function (birthDay) {
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
    ModalPage.prototype.getUserData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afAuth.authState.pipe(first()).toPromise()];
                    case 1:
                        user = _a.sent();
                        this.userID = user.uid;
                        this.userData = this.user.getUser(user.uid);
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalPage.prototype.addPetToVet = function () {
        this.pets.updatePetVet(this.userID, this.petID);
        this.showAlert("ok!", "Mascota guardada");
    };
    ModalPage.prototype.showAlert = function (header, message) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alert.create({
                            header: header,
                            message: message,
                            buttons: ["Ok"]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalPage = __decorate([
        Component({
            selector: 'modal',
            templateUrl: './modal.page.html',
            styleUrls: ['./modal.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController,
            ModalController,
            NavParams,
            UserService,
            PetService,
            AngularFireAuth,
            AlertController])
    ], ModalPage);
    return ModalPage;
}());
export { ModalPage };
//# sourceMappingURL=modal.page.js.map