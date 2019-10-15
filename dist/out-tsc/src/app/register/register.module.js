import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { Ng2TelInputModule } from 'ng2-tel-input';
var routes = [
    {
        path: '',
        component: RegisterPage
    }
];
var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                Ng2TelInputModule,
                RouterModule.forChild(routes)
            ],
            declarations: [RegisterPage],
            providers: [
                AngularFireAuth
            ]
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());
export { RegisterPageModule };
//# sourceMappingURL=register.module.js.map