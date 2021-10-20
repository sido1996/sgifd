import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppuiBudgetaireComponent } from './appui-budgetaire.component';
import { NouveauAppuiBudgetaireComponent } from './nouveau-appui-budgetaire/nouveau-appui-budgetaire.component';
import { DetailAppuiBudgetaireComponent } from './detail-appui-budgetaire/detail-appui-budgetaire.component';
import { ListAppuiBudgetaireComponent } from './list-appui-budgetaire/list-appui-budgetaire.component';
import { ModifierAppuiBudgetaireComponent } from './modifier-appui-budgetaire/modifier-appui-budgetaire.component';

const routes: Routes = [
  {
    path: '',
    component: AppuiBudgetaireComponent,
    children: [
      {
        path: 'parametre',
        loadChildren: () => import('../parametrage/parametrage.module').then(m => m.ParametrageModule),
      },

      { path: 'nouveau-appui-budgetaire', component: NouveauAppuiBudgetaireComponent },
      { path: 'modifier-appui-budgetaire/:paramKey', component: ModifierAppuiBudgetaireComponent },
      { path: 'detail-appui-budgetaire/:paramKey', component: DetailAppuiBudgetaireComponent },
      { path: 'list-appui-budgetaire', component: ListAppuiBudgetaireComponent },

    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppuiBudgetaireRoutingModule { }
