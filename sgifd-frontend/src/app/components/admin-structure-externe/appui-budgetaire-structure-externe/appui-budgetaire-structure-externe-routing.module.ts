import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppuiBudgetaireStructureExterneComponent } from './appui-budgetaire-structure-externe.component';
import { DetailAppuiComponent } from './detail-appui/detail-appui.component';
import { NouveauAppuiComponent } from './nouveau-appui/nouveau-appui.component';
import { ModifierAppuiComponent } from './modifier-appui/modifier-appui.component';
import { ListAppuiComponent } from './list-appui/list-appui.component';

const routes: Routes = [{
  path: '',
  component: AppuiBudgetaireStructureExterneComponent,
  children: [
    { path: 'nouveau-appui-budgetaire', component: NouveauAppuiComponent },
    { path: 'modifier-appui-budgetaire/:paramKey', component: ModifierAppuiComponent },
    { path: 'detail-appui-budgetaire/:paramKey', component: DetailAppuiComponent },
    { path: 'list-appui-budgetaire', component: ListAppuiComponent },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppuiBudgetaireStructureExterneRoutingModule { }
