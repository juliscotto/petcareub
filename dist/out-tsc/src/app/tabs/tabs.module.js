import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';
import { TabsRoutingModule } from './tabs.router.module';
var TabsPageModule = /** @class */ (function () {
    function TabsPageModule() {
    }
    TabsPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                TabsRoutingModule
            ],
            declarations: [TabsPage]
        })
    ], TabsPageModule);
    return TabsPageModule;
}());
export { TabsPageModule };
//# sourceMappingURL=tabs.module.js.map