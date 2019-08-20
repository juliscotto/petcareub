import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

signUp() {
    Parse.User.signUp(this.fullname,this.email, this.password).then((resp) => {
      console.log('Logged in successfully', resp);

      // Clears up the form
      this.fullname = '';
      this.email = '';
      this.password = '';

      this.toastCtrl.create({
        message: 'Account created successfully',
        duration: 2000
      }).present();
    }, err => {
      console.log('Error signing in', err);

      this.toastCtrl.create({
        message: err.message,
        duration: 2000
      }).present();
    });
  }

  signIn() {
    Parse.User.logIn(this.username, this.password).then((resp) => {
      console.log('Logged in successfully', resp);

      // If you app has Tabs, set root to TabsPage
      this.navCtrl.setRoot('HomePage')
    }, err => {
      console.log('Error logging in', err);

      this.toastCtrl.create({
        message: err.message,
        duration: 2000
      }).present();
    });
  }