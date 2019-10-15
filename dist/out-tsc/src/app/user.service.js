import { __assign, __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
var UserService = /** @class */ (function () {
    function UserService(afAuth, afs) {
        this.afAuth = afAuth;
        this.afs = afs;
    }
    UserService.prototype.setUser = function (user) {
        this.user = user;
    };
    UserService.prototype.getUID = function () {
        if (!this.user) {
            if (this.afAuth.auth.currentUser) {
                var user = this.afAuth.auth.currentUser;
                if ()
                    this.setUser({
                        fullname: this.user.fullname,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        vetApproved: this.user.vetApproved,
                        vetcertificate: this.user.vetcertificate,
                        uid: user.uid
                    });
                return user.uid;
            }
            else {
                throw new Error("User not logged in");
            }
        }
        else {
            return this.user.uid;
        }
    };
    UserService.prototype.getUser = function (userID) {
        return this.afs.collection('users').doc(userID).valueChanges();
    };
    UserService.prototype.getUserData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, itemsCollection, userdata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afAuth.authState.pipe(first()).toPromise()];
                    case 1:
                        user = _a.sent();
                        this.userData = this.getUser(user.uid);
                        itemsCollection = this.afs.collection('users').doc(user.uid);
                        userdata = itemsCollection.snapshotChanges().pipe(map(function (actions) {
                            return (__assign({ $key: actions.payload.id }, actions.payload.data()));
                        }));
                        return [2 /*return*/, userdata];
                }
            });
        });
    };
    UserService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireAuth,
            AngularFirestore])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map