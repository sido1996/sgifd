import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPtfComponent } from './admin-ptf.component';
import { ListProjetsFinancesComponent } from './list-projets-finances/list-projets-finances.component';
import { ListRequeteEncoursComponent } from './list-requete-encours/list-requete-encours.component';
import { ListRequeteCloturesComponent } from './list-requete-clotures/list-requete-clotures.component';
import { NouveauProjetPtfComponent } from './Nouveau/nouveau-projet-ptf/nouveau-projet-ptf.component';
import { SuiviProjetPtfComponent } from './Nouveau/suivi-projet-ptf/suivi-projet-ptf.component';
import { AdminPtfMenuComponent } from './admin-ptf-menu/admin-ptf-menu.component';
import { FinanceAnnuelProjetComponent } from './finance-annuel-projet/finance-annuel-projet.component';
import { NouveauAppuisBudgetairesComponent } from './appuis-budgetaires/nouveau-appuis-budgetaires/nouveau-appuis-budgetaires.component';
import { ModifierAppuisBudgetairesComponent } from './appuis-budgetaires/modifier-appuis-budgetaires/modifier-appuis-budgetaires.component';
import { ListAppuisBudgetairesComponent } from './appuis-budgetaires/list-appuis-budgetaires/list-appuis-budgetaires.component';
import { DetailAppuisBudgetairesComponent } from './appuis-budgetaires/detail-appuis-budgetaires/detail-appuis-budgetaires.component';
import {DetailRequeteComponent} from "../admin/requete-financement/detail-requete/detail-requete.component";
import {DetailProjetSuiviComponent} from "../admin/projet/detail-projet-suivi/detail-projet-suivi.component";

const routes: Routes = [{
  path: '',
  component: AdminPtfComponent,
  children: [
    {path: '', component: AdminPtfMenuComponent,},

    {path: 'nouveau-projet-ptf', component: NouveauProjetPtfComponent,},
    {path: 'nouveau-appuis-budgetaire', component: NouveauAppuisBudgetairesComponent,},

    {path: 'modifier-appuis-budgetaire/:id', component: ModifierAppuisBudgetairesComponent,},

    {path: 'list-projets-finances', component: ListProjetsFinancesComponent,},
    {path: 'list-encours', component: ListRequeteEncoursComponent,},
    {path: 'list-clotures', component: ListRequeteCloturesComponent,},
    {path: 'finance-annuel-projet', component: FinanceAnnuelProjetComponent,},
    {path: 'list-appuis-budgetaire', component: ListAppuisBudgetairesComponent,},

    {path: 'detail/:paramKey', component: DetailRequeteComponent},
    {path: 'detail-projets-finances/:paramKey', component: DetailProjetSuiviComponent},
    {path: 'detail-appuis-budgetaire/:id', component: DetailAppuisBudgetairesComponent},


    {path: 'suivi-projet-ptf/:idP', component: SuiviProjetPtfComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPtfRoutingModule { }
