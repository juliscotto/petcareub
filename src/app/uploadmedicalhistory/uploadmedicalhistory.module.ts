import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UploadmedicalhistoryPage } from './uploadmedicalhistory.page';

const routes: Routes = [
  {
    path: '',
    component: UploadmedicalhistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UploadmedicalhistoryPage]
})
export class UploadmedicalhistoryPageModule {}
