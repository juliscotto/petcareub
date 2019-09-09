import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UploaderPage } from './uploader.page';
var routes = [
    {
        path: '',
        component: UploaderPage
    }
];
var UploaderPageModule = /** @class */ (function () {
    function UploaderPageModule() {
    }
    UploaderPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UploaderPage]
        })
    ], UploaderPageModule);
    return UploaderPageModule;
}());
export { UploaderPageModule };
//# sourceMappingURL=uploader.module.js.map