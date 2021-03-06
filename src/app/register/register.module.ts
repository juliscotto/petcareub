import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { Ng2TelInputModule } from 'ng2-tel-input';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2TelInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterPage],
   providers: [
    AngularFireAuth
  ]
})
export class RegisterPageModule {}
