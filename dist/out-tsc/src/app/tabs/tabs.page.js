import { __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
var TabsPage = /** @class */ (function () {
    function TabsPage() {
    }
    TabsPage.prototype.ngOnInit = function () {
        this.tabs.select('feed');
    };
    __decorate([
        ViewChild('tabs'),
        __metadata("design:type", IonTabs)
    ], TabsPage.prototype, "tabs", void 0);
    TabsPage = __decorate([
        Component({
            selector: 'app-tabs',
            templateUrl: './tabs.page.html',
            styleUrls: ['./tabs.page.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.page.js.map