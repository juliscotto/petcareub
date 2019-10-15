import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(afAuth, router, user) {
        this.afAuth = afAuth;
        this.router = router;
        this.user = user;
        this.fullname = "";
        this.email = "";
        this.phoneNumber = "";
        this.password = "";
        this.vetApproved = false;
        this.vetcertificate = "";
    }
    LoginPage.prototype.ngOnInit = function () { };
    LoginPage.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, fullname, email, phoneNumber, password, vetApproved, vetcertificate, res, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, fullname = _a.fullname, email = _a.email, phoneNumber = _a.phoneNumber, password = _a.password, vetApproved = _a.vetApproved, vetcertificate = _a.vetcertificate;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.afAuth.auth.signInWithEmailAndPassword(email, password)];
                    case 2:
                        res = _b.sent();
                        if (res.user) {
                            this.user.setUser({
                                fullname: fullname,
                                email: email,
                                phoneNumber: phoneNumber,
                                vetApproved: vetApproved,
                                vetcertificate: vetcertificate,
                                uid: res.user.uid
                            });
                            this.router.navigate(['/tabs']);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.dir(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [AngularFireAuth,
            Router,
            UserService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map