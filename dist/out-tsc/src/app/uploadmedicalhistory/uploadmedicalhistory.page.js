import { __assign, __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../pet.service';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { MedicalHistory } from '../medicalhistory.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, finalize, first } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import 'rxjs/add/observable/of';
import { AngularFireAuth } from '@angular/fire/auth';
var UploadmedicalhistoryPage = /** @class */ (function () {
    function UploadmedicalhistoryPage(route, pets, router, filePath, fileChooser, filePicker, file, medicalhistory, afstore, alert, afStorage, db, platform, user, afAuth) {
        this.route = route;
        this.pets = pets;
        this.router = router;
        this.filePath = filePath;
        this.fileChooser = fileChooser;
        this.filePicker = filePicker;
        this.file = file;
        this.medicalhistory = medicalhistory;
        this.afstore = afstore;
        this.alert = alert;
        this.afStorage = afStorage;
        this.db = db;
        this.platform = platform;
        this.user = user;
        this.afAuth = afAuth;
        this.petID = "";
        this.returnpath = "";
        this.vetApproved = false;
        this.vetName = "";
        this.diagnosis = "";
        this.comments = "";
        this.fileUri = "";
    }
    UploadmedicalhistoryPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.route.params.subscribe(function (params) {
                    _this.petID = params.petId;
                    _this.vetApproved = (params.vetApproved == "true");
                    _this.updateVetName();
                });
                return [2 /*return*/];
            });
        });
    };
    UploadmedicalhistoryPage.prototype.upload = function () {
        var _this = this;
        this.platform.ready().then(function () {
            var platforms = _this.platform.platforms();
            if (_this.platform.is('android') && !platforms.includes("mobileweb")) {
                _this.fileChooser.open().then(function (uri) {
                    alert(uri);
                    _this.filePath.resolveNativePath(uri).then(function (filePath) {
                        alert(filePath);
                        var dirPathSegments = filePath.split('/');
                        var fileName = dirPathSegments[dirPathSegments.length - 1];
                        dirPathSegments.pop();
                        var dirPath = dirPathSegments.join('/');
                        _this.file.readAsArrayBuffer(dirPath, fileName).then(function (buffer) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.upload2(buffer, fileName)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }).catch(function (err) {
                            alert(err.toString());
                        });
                    });
                });
            }
            else if (_this.platform.is('ios') && !platforms.includes("mobileweb")) {
                console.log(platforms);
                _this.filePicker.pickFile()
                    .then(function (uri) {
                    alert(uri);
                    var correctPath = uri.substr(0, uri.lastIndexOf('/') + 1);
                    var currentName = uri.substring(uri.lastIndexOf('/') + 1);
                    _this.file.readAsArrayBuffer("file:///" + correctPath, currentName).then(function (buffer) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.upload2(buffer, currentName)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }).catch(function (err) {
                        alert(err.toString());
                    });
                });
            }
            else {
                alert("Esta funcion, por el momento, solo esta disponible para aplicacion movil");
            }
        });
    };
    UploadmedicalhistoryPage.prototype.upload2 = function (buffer, name) {
        return __awaiter(this, void 0, void 0, function () {
            var blob, date, fileRef, uploadTask;
            var _this = this;
            return __generator(this, function (_a) {
                blob = new Blob([buffer], { type: "application/pdf" });
                date = new Date();
                fileRef = this.afStorage.ref("medicalhistoryentries/" + this.petID + "/" + date + "/" + name);
                uploadTask = this.afStorage.ref("medicalhistoryentries/" + this.petID + "/" + date + "/" + name).put(blob);
                // observe percentage changes
                this.uploadPercent = uploadTask.percentageChanges();
                // get notified when the download URL is available
                uploadTask.snapshotChanges().pipe(finalize(function () { return fileRef.getDownloadURL().subscribe((function (value) { return _this.fileUri = value; })); }))
                    .subscribe();
                return [2 /*return*/];
            });
        });
    };
    UploadmedicalhistoryPage.prototype.addNewMedicalEntry = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, vetName, diagnosis, comments, petID, fileUri, id;
            return __generator(this, function (_b) {
                _a = this, vetName = _a.vetName, diagnosis = _a.diagnosis, comments = _a.comments, petID = _a.petID, fileUri = _a.fileUri, id = _a.id;
                try {
                    this.afstore.collection('medicalhistoryentries').add({
                        vetName: vetName,
                        diagnosis: diagnosis,
                        comments: comments,
                        fileUri: fileUri,
                        petID: petID,
                        date: Date(),
                        id: this.afstore.createId()
                    });
                    this.medicalhistory.setMedicalHistory({
                        vetName: vetName,
                        diagnosis: diagnosis,
                        comments: comments,
                        petID: petID,
                        fileUri: fileUri,
                        date: Date(),
                        id: id,
                    });
                    this.showAlert("Success!", "Entrada guardada");
                    this.router.navigate(['/petprofile/', this.petID, this.vetApproved]);
                }
                catch (error) {
                    console.dir(error);
                    this.showAlert("Error", error.message);
                }
                return [2 /*return*/];
            });
        });
    };
    UploadmedicalhistoryPage.prototype.showAlert = function (header, message) {
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
    UploadmedicalhistoryPage.prototype.getUserData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, itemsCollection, userdata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afAuth.authState.pipe(first()).toPromise()];
                    case 1:
                        user = _a.sent();
                        itemsCollection = this.afstore.collection('users').doc(user.uid);
                        userdata = itemsCollection.snapshotChanges().pipe(map(function (actions) {
                            return (__assign({ $key: actions.payload.id }, actions.payload.data()));
                        }));
                        return [2 /*return*/, userdata];
                }
            });
        });
    };
    UploadmedicalhistoryPage.prototype.updateVetName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.vetApproved === true)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getUserData()];
                    case 1:
                        _a.userData = _b.sent();
                        this.userData.subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, data];
                                    case 1:
                                        _b.sent();
                                        _a = this;
                                        return [4 /*yield*/, data['fullname']];
                                    case 2:
                                        _a.vetName = _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    UploadmedicalhistoryPage = __decorate([
        Component({
            selector: 'app-uploadmedicalhistory',
            templateUrl: './uploadmedicalhistory.page.html',
            styleUrls: ['./uploadmedicalhistory.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            PetService,
            Router,
            FilePath,
            FileChooser,
            IOSFilePicker,
            File,
            MedicalHistory,
            AngularFirestore,
            AlertController,
            AngularFireStorage,
            AngularFireDatabase,
            Platform,
            UserService,
            AngularFireAuth])
    ], UploadmedicalhistoryPage);
    return UploadmedicalhistoryPage;
}());
export { UploadmedicalhistoryPage };
//# sourceMappingURL=uploadmedicalhistory.page.js.map