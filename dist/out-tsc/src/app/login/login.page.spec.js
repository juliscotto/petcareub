var _this = this;
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
describe('LoginPage', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [LoginPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
signUp();
{
    Parse.User.signUp(this.fullname, this.email, this.password).then(function (resp) {
        console.log('Logged in successfully', resp);
        // Clears up the form
        _this.fullname = '';
        _this.email = '';
        _this.password = '';
        _this.toastCtrl.create({
            message: 'Account created successfully',
            duration: 2000
        }).present();
    }, function (err) {
        console.log('Error signing in', err);
        _this.toastCtrl.create({
            message: err.message,
            duration: 2000
        }).present();
    });
}
signIn();
{
    Parse.User.logIn(this.username, this.password).then(function (resp) {
        console.log('Logged in successfully', resp);
        // If you app has Tabs, set root to TabsPage
        _this.navCtrl.setRoot('HomePage');
    }, function (err) {
        console.log('Error logging in', err);
        _this.toastCtrl.create({
            message: err.message,
            duration: 2000
        }).present();
    });
}
//# sourceMappingURL=login.page.spec.js.map