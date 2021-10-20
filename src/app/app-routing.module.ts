import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FourOhFourComponent} from './components/four-oh-four/four-oh-four.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {PasswordRequestComponent} from "./components/password-request/password-request.component";
import {MonCompteComponent} from './components/mon-compte/mon-compte.component';
import {AdminGuardService} from "./utils/admin-guard.service";
import {AdminStructureGuardService} from "./utils/admin-structure-guard.service";
import {AdminPtfGuardService} from "./utils/admin-ptf-guard.service";
import { MenuAdminComponent } from './components/admin/menu-admin/menu-admin.component';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuardService],
   
   
  },
  {
    path: 'admin-structure-externe',
    loadChildren: () => import('./components/admin-structure-externe/admin-structure-externe.module').then(m => m.AdminStructureExterneModule),
    canActivate: [AdminStructureGuardService],
  },
  {
    path: 'admin-ptf',
    loadChildren: () => import('./components/admin-ptf/admin-ptf.module').then(m => m.AdminPtfModule),
    canActivate: [AdminPtfGuardService],
  },

  {path: '', component: HomeComponent},

  {path: 'login', component: LoginComponent},

  {path: 'password-request', component: PasswordRequestComponent},

  {path: 'mon-compte', component: MonCompteComponent,},

  {path: '**', component: FourOhFourComponent},
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

