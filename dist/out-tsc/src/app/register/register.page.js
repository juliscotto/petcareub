import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(afAuth, afstore, user, alert, router) {
        this.afAuth = afAuth;
        this.afstore = afstore;
        this.user = user;
        this.alert = alert;
        this.router = router;
        this.fullname = "";
        this.email = "";
        this.password = "";
        this.cpassword = "";
        this.vetApproved = false;
        this.vetcertificate = "";
        this.message = "";
        this.hide = false;
        this.checked = false;
    }
    RegisterPage.prototype.ngOnInit = function () {
    };
    RegisterPage.prototype.addValue = function (e) {
        var isChecked = e.currentTarget.checked;
        if (this.checked) {
            this.hide = false;
        }
        else {
            this.hide = true;
        }
    };
    RegisterPage.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, fullname, email, password, cpassword, vetApproved, vetcertificate, res, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, fullname = _a.fullname, email = _a.email, password = _a.password, cpassword = _a.cpassword, vetApproved = _a.vetApproved, vetcertificate = _a.vetcertificate;
                        if (password !== cpassword) {
                            this.showAlert("Error", "Passwords don't match");
                            return [2 /*return*/, console.error("Passwords don't match!")];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.afAuth.auth.createUserWithEmailAndPassword(email, password)];
                    case 2:
                        res = _b.sent();
                        console.log(res);
                        this.afstore.doc("users/" + res.user.uid).set({
                            fullname: fullname,
                            email: email,
                            vetApproved: vetApproved,
                            vetcertificate: vetcertificate
                        });
                        this.user.setUser({
                            fullname: fullname,
                            email: email,
                            vetApproved: vetApproved,
                            vetcertificate: vetcertificate,
                            uid: res.user.uid
                        });
                        if (this.checked) {
                            this.message = "Nos tomaremos un dias en comprobar la validez de su matricula.";
                        }
                        else {
                            this.message = "Bienvenido";
                        }
                        this.showAlert("Registro correcto", this.message);
                        this.router.navigate(['/tabs']);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.dir(error_1);
                        this.showAlert("Error", error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage.prototype.showAlert = function (header, message) {
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
    RegisterPage = __decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        __metadata("design:paramtypes", [AngularFireAuth,
            AngularFirestore,
            UserService,
            AlertController,
            Router])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map