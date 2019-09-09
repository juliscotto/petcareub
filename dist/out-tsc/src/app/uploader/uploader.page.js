import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { PetService } from '../pet.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
var UploaderPage = /** @class */ (function () {
    function UploaderPage(afstore, pet, alert, router, user, afAuth) {
        this.afstore = afstore;
        this.pet = pet;
        this.alert = alert;
        this.router = router;
        this.user = user;
        this.afAuth = afAuth;
        this.genders = [{
                name: 'Macho',
                value: false
            }, {
                name: 'Hembra',
                value: false
            }];
        this.hide = false;
        this.namePet = "";
        this.gender = "";
        this.type = "";
        this.breed = "";
        this.birthday = "";
        this.id = "";
        this.uidOwner = "";
        this.otherType = "";
    }
    UploaderPage.prototype.selection = function (name) {
        var _this = this;
        this.genders.forEach(function (x) {
            if (x.name !== name) {
                x.value = !x.value;
                _this.gender = name;
            }
        });
    };
    UploaderPage.prototype.onChange = function (value) {
        if (value == "other") {
            this.hide = true;
        }
        else {
            this.hide = false;
        }
    };
    UploaderPage.prototype.registerPet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, namePet, gender, type, breed, birthday, id, uidOwner, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.type == "other") {
                            this.type = this.otherType;
                        }
                        else {
                            this.type = this.type;
                        }
                        _a = this, namePet = _a.namePet, gender = _a.gender, type = _a.type, breed = _a.breed, birthday = _a.birthday, id = _a.id, uidOwner = _a.uidOwner;
                        return [4 /*yield*/, this.isLoggedIn()];
                    case 1:
                        user = _b.sent();
                        try {
                            this.afstore.collection('pets').add({
                                namePet: namePet,
                                gender: gender,
                                type: type,
                                breed: breed,
                                birthday: birthday,
                                uidOwner: user.uid,
                                id: this.afstore.createId()
                            });
                            this.pet.setPet({
                                namePet: namePet,
                                gender: gender,
                                type: type,
                                breed: breed,
                                birthday: birthday,
                                uidOwner: uidOwner,
                                id: id
                            });
                            this.showAlert("Success!", "Mascota guardada");
                        }
                        catch (error) {
                            console.dir(error);
                            this.showAlert("Error", error.message);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UploaderPage.prototype.showAlert = function (header, message) {
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
    UploaderPage.prototype.isLoggedIn = function () {
        return this.afAuth.authState.pipe(first()).toPromise();
    };
    UploaderPage.prototype.ngOnInit = function () {
    };
    UploaderPage = __decorate([
        Component({
            selector: 'app-uploader',
            templateUrl: './uploader.page.html',
            styleUrls: ['./uploader.page.scss'],
        }),
        __metadata("design:paramtypes", [AngularFirestore,
            PetService,
            AlertController,
            Router,
            UserService,
            AngularFireAuth])
    ], UploaderPage);
    return UploaderPage;
}());
export { UploaderPage };
//# sourceMappingURL=uploader.page.js.map