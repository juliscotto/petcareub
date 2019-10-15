import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalPage } from './modal.page';
var routes = [
    {
        path: '',
        component: ModalPage
    }
];
var ModalPageModule = /** @class */ (function () {
    function ModalPageModule() {
    }
    ModalPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ModalPage]
        })
    ], ModalPageModule);
    return ModalPageModule;
}());
export { ModalPageModule };
//# sourceMappingURL=modal.module.js.map