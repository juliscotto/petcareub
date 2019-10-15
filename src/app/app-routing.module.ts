import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppRoutingPreloaderService } from './AppRoutingPreloaderService.page';

const routes: Routes = [
	{ path: '', redirectTo: 'register', pathMatch: 'full' },
	{ path: 'login', loadChildren: './login/login.module#LoginPageModule' },
	{ path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
	{ path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
	{ path: 'petprofile/:petId/:vetApproved', loadChildren: './petprofile/petprofile.module#PetprofilePageModule' },
	{ path: 'uploadmedicalhistory/:petId/:vetApproved', loadChildren: './uploadmedicalhistory/uploadmedicalhistory.module#UploadmedicalhistoryPageModule' },
	{ path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },

];
@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: AppRoutingPreloaderService })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
