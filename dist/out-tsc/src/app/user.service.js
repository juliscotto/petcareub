import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
var UserService = /** @class */ (function () {
    function UserService(afAuth) {
        this.afAuth = afAuth;
    }
    UserService.prototype.setUser = function (user) {
        this.user = user;
    };
    UserService.prototype.getUID = function () {
        if (!this.user) {
            if (this.afAuth.auth.currentUser) {
                var user = this.afAuth.auth.currentUser;
                this.setUser({
                    fullname: this.user.fullname,
                    email: user.email,
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
    UserService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireAuth])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map