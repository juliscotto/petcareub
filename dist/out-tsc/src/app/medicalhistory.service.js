import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
var MedicalHistory = /** @class */ (function () {
    function MedicalHistory(user, afs) {
        this.user = user;
        this.afs = afs;
    }
    MedicalHistory.prototype.getMedicalHistoryEntries = function (petID) {
        var entries = this.afs.collection("medicalhistoryentries", function (ref) {
            return ref.where('petID', '==', petID);
        });
        this.entryData = entries.valueChanges();
        return this.entryData;
    };
    MedicalHistory.prototype.setMedicalHistory = function (medicalhistory) {
        this.medicalhistory = medicalhistory;
    };
    MedicalHistory.prototype.getID = function () {
        return this.medicalhistory.id;
    };
    MedicalHistory = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [UserService,
            AngularFirestore])
    ], MedicalHistory);
    return MedicalHistory;
}());
export { MedicalHistory };
//# sourceMappingURL=medicalhistory.service.js.map