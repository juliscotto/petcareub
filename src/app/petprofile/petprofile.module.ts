import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PetprofilePage } from './petprofile.page';
import { NgxQRCodeModule } from 'ngx-qrcode2'; 

const routes: Routes = [
  {
    path: '',
    component: PetprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxQRCodeModule
  ],
  declarations: [PetprofilePage]
})
export class PetprofilePageModule {}
