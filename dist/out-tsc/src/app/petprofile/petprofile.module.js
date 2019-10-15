import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PetprofilePage } from './petprofile.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';
var routes = [
    {
        path: '',
        component: PetprofilePage
    }
];
var PetprofilePageModule = /** @class */ (function () {
    function PetprofilePageModule() {
    }
    PetprofilePageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                NgxQRCodeModule
            ],
            declarations: [PetprofilePage]
        })
    ], PetprofilePageModule);
    return PetprofilePageModule;
}());
export { PetprofilePageModule };
//# sourceMappingURL=petprofile.module.js.map