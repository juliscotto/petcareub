import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../pet.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxQRCodeModule } from 'ngx-qrcode2';
var PetprofilePage = /** @class */ (function () {
    function PetprofilePage(route, pets, router, db, afStorage, afAuth, platform, file, ft, fileOpener, document, afs, alertController, qrController) {
        this.route = route;
        this.pets = pets;
        this.router = router;
        this.db = db;
        this.afStorage = afStorage;
        this.afAuth = afAuth;
        this.platform = platform;
        this.file = file;
        this.ft = ft;
        this.fileOpener = fileOpener;
        this.document = document;
        this.afs = afs;
        this.alertController = alertController;
        this.qrController = qrController;
        this.petID = "";
        this.vetApproved = false;
        this.docID = "";
        this.type = "mascota";
        this.countItems = 0;
        this.qr_data = "";
        this.created_code = {};
    }
    PetprofilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.petID = params.petId;
            _this.vetApproved = (params.vetApproved == "true");
        });
        if (this.vetApproved === true) {
            this.type = "paciente";
        }
        this.userPets = this.pets.getPetData(this.petID);
        this.userPets.subscribe(function (pets) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, pets];
                    case 1:
                        _a.petData = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        this.medicalHistories = this.pets.getPetMedicalHistories(this.petID);
        this.qr_data = this.petID;
        this.created_code = this.qr_data;
    };
    PetprofilePage.prototype.downloadAndOpenPdf = function (fileURI) {
        var _this = this;
        var downloadUrl = fileURI;
        var path = this.file.dataDirectory;
        var transfer = this.ft.create();
        transfer.download(downloadUrl, path + 'preview.pdf').then(function (entry) {
            var url = entry.toURL();
            if (_this.platform.is('ios')) {
                _this.document.viewDocument(url, 'application/pdf', {});
            }
            else {
                _this.fileOpener.open(url, 'application/pdf')
                    .then(function () { return console.log('File is opened'); })
                    .catch(function (e) { return console.log('Error opening file', e); });
            }
        });
    };
    PetprofilePage.prototype.deleteMedicalHistory = function (idMedicalHistoryEntry, fileURI) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Estas seguro que queres eliminar esta entrada?',
                            message: 'Esta accion no se podra deshacer',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                    }
                                }, {
                                    text: 'Si',
                                    handler: function () {
                                        _this.afs.doc("medicalhistoryentries/" + idMedicalHistoryEntry.$key).delete();
                                        if (fileURI != "") {
                                            _this.afStorage.storage.refFromURL(idMedicalHistoryEntry.fileUri).delete();
                                        }
                                    }
                                }
                            ]
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
    PetprofilePage.prototype.isLoggedIn = function () {
        return this.afAuth.authState.pipe(first()).toPromise();
    };
    PetprofilePage.prototype.redirectMedicalHistory = function () {
        this.router.navigate(['/uploadmedicalhistory/', this.petID, this.vetApproved]);
    };
    PetprofilePage.prototype.age = function (birthDay) {
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
    PetprofilePage.prototype.deletePet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headerChanged, alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headerChanged = "";
                        if (this.type == "mascota") {
                            headerChanged = "esta mascota?";
                        }
                        else {
                            headerChanged = "este paciente?";
                        }
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Estas seguro que queres eliminar ' + headerChanged,
                                message: 'Esta accion no se podra deshacer',
                                buttons: [
                                    {
                                        text: 'No',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function (blah) {
                                        }
                                    }, {
                                        text: 'Si',
                                        handler: function () {
                                            if (_this.vetApproved === true) {
                                                _this.pets.updatePetVet("", _this.petData[0]["id"]);
                                                _this.showAlert("Paciente eliminado!", "yay!");
                                            }
                                            else {
                                                _this.afs.doc("pets/" + _this.petData[0]["$key"]).delete();
                                                _this.pets.deleteAllMedialEntries(_this.petData[0]["id"]);
                                                _this.showAlert("Mascota eliminado!", "yay!");
                                            }
                                            _this.router.navigate(['/tabs']);
                                        }
                                    }
                                ]
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
    PetprofilePage.prototype.showAlert = function (header, message) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
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
    PetprofilePage = __decorate([
        Component({
            selector: 'app-petprofile',
            templateUrl: './petprofile.page.html',
            styleUrls: ['./petprofile.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            PetService,
            Router,
            AngularFireDatabase,
            AngularFireStorage,
            AngularFireAuth,
            Platform,
            File,
            FileTransfer,
            FileOpener,
            DocumentViewer,
            AngularFirestore,
            AlertController,
            NgxQRCodeModule])
    ], PetprofilePage);
    return PetprofilePage;
}());
export { PetprofilePage };
//# sourceMappingURL=petprofile.page.js.map