import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { AuthGuard } from '../../utils/AuthGuard';

const routes: Routes = [

  {
    path: '', component: AdminComponent,

    children: [
      {
        path: '',
        component: MenuAdminComponent,
      },
      {
        path: 'accords',
        loadChildren: () => import('./accords/accord.module').then(m => m.AccordModule), canActivate: [AuthGuard],
      },
      {
        path: 'rapport',
        loadChildren: () => import('./rapport/rapport.module').then(m => m.RapportModule), canActivate: [AuthGuard],
      },
      {
        path: 'aides-secours',
        loadChildren: () => import('./aide-secours/aide-secours.module').then(m => m.AideSecoursModule), canActivate: [AuthGuard],
      },
      {
        path: 'cooperation-decentralisee',
        loadChildren: () => import('./cooperation-decentralisee/cooperation-decentralisee.module').then(m => m.CooperationDecentraliseeModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'fonds-specifiques',
        loadChildren: () => import('./fonds-specifiques/fonds-specifiques.module').then(m => m.FondsSpecifiquesModule), canActivate: [AuthGuard],
      },
      {
        path: 'ide',
        loadChildren: () => import('./ide/ide.module').then(m => m.IdeModule), canActivate: [AuthGuard],
      },
      {
        path: 'parametrage',
        loadChildren: () => import('./parametrage/parametrage.module').then(m => m.ParametrageModule), canActivate: [AuthGuard],
      },
      {
        path: 'ppp',
        loadChildren: () => import('./ppp/ppp.module').then(m => m.PppModule), canActivate: [AuthGuard],
      },
      {
        path: 'projet',
        loadChildren: () => import('./projet/projet.module').then(m => m.ProjetModule), canActivate: [AuthGuard],
      },
      {
        path: 'requete-financement',
        loadChildren: () => import('./requete-financement/requete-financement.module').then(m => m.RequeteFinancementModule), canActivate: [AuthGuard],
      },
      {
        path: 'commision-dsp',
        loadChildren: () => import('./commision-mixte-dsp/commision-mixte-dsp.module').then(m => m.CommisionMixteDspModule), canActivate: [AuthGuard],
      },
      {
        path: 'utilisateurs',
        loadChildren: () => import('./utilisateurs/utilisateurs.module').then(m => m.UtilisateursModule), canActivate: [AuthGuard],
      },
      {
        path: 'appui-budgetaire',
        loadChildren: () => import('./appui-budgetaire/appui-budgetaire.module').then(m => m.AppuiBudgetaireModule), canActivate: [AuthGuard],
      },


    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
