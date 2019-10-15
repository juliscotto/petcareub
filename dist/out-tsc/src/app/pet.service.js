import { __assign, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
var PetService = /** @class */ (function () {
    function PetService(user, afs) {
        this.user = user;
        this.afs = afs;
        this.countItems = 0;
    }
    PetService.prototype.getPetMedicalHistories = function (petID) {
        var _this = this;
        this.itemsCollection = this.afs.collection('medicalhistoryentries', function (ref) {
            return ref.where('petID', '==', petID);
        });
        this.petData = this.itemsCollection.snapshotChanges()
            .map(function (actions) {
            _this.countItems = actions.length;
            return actions.map(function (action) { return (__assign({ $key: action.payload.doc.id }, action.payload.doc.data())); });
        });
        return this.petData;
    };
    PetService.prototype.getPetsList = function () {
        var _this = this;
        var pets = this.afs.collection("pets", function (ref) {
            return ref.where('uidOwner', '==', _this.user.getUID());
        });
        this.petData = pets.valueChanges();
        return this.petData;
    };
    PetService.prototype.getPet = function (petID) {
        var pets = this.afs.collection("pets", function (ref) {
            return ref.where('id', '==', petID);
        });
        this.petData = pets.valueChanges();
        return this.petData;
    };
    PetService.prototype.getPetData = function (petID) {
        var _this = this;
        var resultID;
        this.itemspet = this.afs.collection('pets', function (ref) {
            return ref.where('id', '==', petID);
        });
        this.datapet = this.itemspet.snapshotChanges()
            .map(function (actions) {
            _this.countItems = actions.length;
            return actions.map(function (action) { return (__assign({ $key: action.payload.doc.id }, action.payload.doc.data())); });
        });
        return this.datapet;
    };
    PetService.prototype.updatePetVet = function (_id, _value) {
        var _this = this;
        var doc = this.afs.collection('pets', function (ref) { return ref.where('id', '==', _value); });
        doc.snapshotChanges().pipe(map(function (actions) { return actions.map(function (a) {
            var data = a.payload.doc.data();
            var iddoc = a.payload.doc.id;
            return __assign({ iddoc: iddoc }, data);
        }); })).subscribe(function (pets) {
            var id = pets.reduce(function (prevValue, pet) {
                return pet.iddoc;
            }, []);
            _this.afs.doc("pets/" + id).update({ idVet: _id });
        });
    };
    PetService.prototype.setPet = function (pet) {
        this.pet = pet;
    };
    PetService.prototype.getID = function () {
        return this.pet.id;
    };
    PetService.prototype.getVetPetsList = function () {
        var _this = this;
        var pets = this.afs.collection("pets", function (ref) {
            return ref.where('idVet', '==', _this.user.getUID());
        });
        this.petData = pets.valueChanges();
        return this.petData;
    };
    PetService.prototype.deleteAllMedialEntries = function (_id) {
        var _this = this;
        var doc = this.afs.collection('medicalhistoryentries', function (ref) { return ref.where('petID', '==', _id); });
        doc.snapshotChanges().pipe(map(function (actions) { return actions.map(function (a) {
            var data = a.payload.doc.data();
            var iddoc = a.payload.doc.id;
            return __assign({ iddoc: iddoc }, data);
        }); })).subscribe(function (pets) {
            var id = pets.reduce(function (prevValue, pet) {
                _this.afs.doc("medicalhistoryentries/" + pet.iddoc).delete();
            }, []);
        });
    };
    PetService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [UserService,
            AngularFirestore])
    ], PetService);
    return PetService;
}());
export { PetService };
//# sourceMappingURL=pet.service.js.map