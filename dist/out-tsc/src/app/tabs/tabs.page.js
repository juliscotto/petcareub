import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { UserService } from '../user.service';
var TabsPage = /** @class */ (function () {
    function TabsPage(user) {
        this.user = user;
        this.vetApproved = false;
    }
    TabsPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.tabs.select('feed');
                        _a = this;
                        return [4 /*yield*/, this.user.getUserData()];
                    case 1:
                        _a.userData = _b.sent();
                        this.userData.subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, data];
                                    case 1:
                                        _a.sent();
                                        this.vetApproved = data['vetApproved'];
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
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
        __metadata("design:paramtypes", [UserService])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.page.js.map