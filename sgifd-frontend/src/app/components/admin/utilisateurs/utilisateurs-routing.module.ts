import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UtilisateursComponent} from "./utilisateurs.component";
import {RoleUserComponent} from "./role-user/role-user.component";
import {NouveauUserComponent} from "./nouveau-user/nouveau-user.component";
import {ModifierUserComponent} from "./modifier-user/modifier-user.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {DetailUserComponent} from "./detail-user/detail-user.component";
import {ModuleSystemeComponent} from "./module-systeme/module-systeme.component";

const routes: Routes = [{
  path: '',
  component: UtilisateursComponent,
  children: [
    {
      path: 'list-user',
      component: ListUserComponent,
    },
    {
      path: 'module-systeme',
      component: ModuleSystemeComponent,
    },
    {
      path: 'nouveau-user',
      component: NouveauUserComponent,
    },
    {
      path: 'modifier-user/:paramKey',
      component: ModifierUserComponent,
    },
    {
      path: 'detail-user/:paramKey',
      component: DetailUserComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilisateursRoutingModule {
}
