import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UploadmedicalhistoryPage } from './uploadmedicalhistory.page';
var routes = [
    {
        path: '',
        component: UploadmedicalhistoryPage
    }
];
var UploadmedicalhistoryPageModule = /** @class */ (function () {
    function UploadmedicalhistoryPageModule() {
    }
    UploadmedicalhistoryPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UploadmedicalhistoryPage]
        })
    ], UploadmedicalhistoryPageModule);
    return UploadmedicalhistoryPageModule;
}());
export { UploadmedicalhistoryPageModule };
//# sourceMappingURL=uploadmedicalhistory.module.js.map