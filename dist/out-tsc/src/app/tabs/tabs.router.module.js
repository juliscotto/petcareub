import { __decorate } from "tslib";
import { RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
import { NgModule } from '@angular/core';
var routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule' },
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule' },
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' }
        ]
    }
];
var TabsRoutingModule = /** @class */ (function () {
    function TabsRoutingModule() {
    }
    TabsRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], TabsRoutingModule);
    return TabsRoutingModule;
}());
export { TabsRoutingModule };
//# sourceMappingURL=tabs.router.module.js.map