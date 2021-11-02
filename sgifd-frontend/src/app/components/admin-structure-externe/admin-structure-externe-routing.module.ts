import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminStructureExterneComponent } from './admin-structure-externe.component';
import { MenuStructureExterneComponent } from './menu-structure-externe/menu-structure-externe.component';
import { AuthGuard } from '../../utils/AuthGuard';

const routes: Routes = [
  {
    path: '',
    component: AdminStructureExterneComponent,

    children: [
      {
        path: '',
        component: MenuStructureExterneComponent,
      },
      {
        path: 'cooperation-decentralisee-structure',
        loadChildren: () => import('./cooperation-decentralisee/cooperation-decentralise.module').then(m => m.CooperationDecentraliseModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'aide-secours-structure',
        loadChildren: () => import('./aide-alimentaire/aide-alimentaire.module').then(m => m.AideAlimentaireModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'projet-structure',
        loadChildren: () => import('./projet-structure/projet-structure.module').then(m => m.ProjetStructureModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'appui-budgetaire-structure',
        loadChildren: () => import('./appui-budgetaire-structure-externe/appui-budgetaire-structure-externe.module').then(m => m.AppuiBudgetaireStructureExterneModule),
        canActivate: [AuthGuard],
      },

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStructureExterneRoutingModule { }
