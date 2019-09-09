import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map