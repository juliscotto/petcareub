import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FeedPage } from './feed.page';
var routes = [
    {
        path: '',
        component: FeedPage
    }
];
var FeedPageModule = /** @class */ (function () {
    function FeedPageModule() {
    }
    FeedPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FeedPage]
        })
    ], FeedPageModule);
    return FeedPageModule;
}());
export { FeedPageModule };
//# sourceMappingURL=feed.module.js.map