import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPtfRoutingModule } from './admin-ptf-routing.module';
import { AdminPtfComponent } from './admin-ptf.component';
import { ListRequeteEncoursComponent } from './list-requete-encours/list-requete-encours.component';
import { ListRequeteCloturesComponent } from './list-requete-clotures/list-requete-clotures.component';
import { ListProjetsFinancesComponent } from './list-projets-finances/list-projets-finances.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NouveauProjetPtfComponent } from './Nouveau/nouveau-projet-ptf/nouveau-projet-ptf.component';
import { SuiviProjetPtfComponent } from './Nouveau/suivi-projet-ptf/suivi-projet-ptf.component';
import { AdminPtfMenuComponent } from './admin-ptf-menu/admin-ptf-menu.component';
import { FinanceAnnuelProjetComponent } from './finance-annuel-projet/finance-annuel-projet.component';
import { NouveauAppuisBudgetairesComponent } from './appuis-budgetaires/nouveau-appuis-budgetaires/nouveau-appuis-budgetaires.component';
import { ModifierAppuisBudgetairesComponent } from './appuis-budgetaires/modifier-appuis-budgetaires/modifier-appuis-budgetaires.component';
import { ListAppuisBudgetairesComponent } from './appuis-budgetaires/list-appuis-budgetaires/list-appuis-budgetaires.component';
import { DetailAppuisBudgetairesComponent } from './appuis-budgetaires/detail-appuis-budgetaires/detail-appuis-budgetaires.component';
import { SharedModule } from '../shared/shared.module';
import {TableModule} from "primeng/components/table/table";
import {RequeteFinancementModule} from "../admin/requete-financement/requete-financement.module";
import {ProjetModule} from "../admin/projet/projet.module";

@NgModule({
  declarations: [AdminPtfComponent,
    ListRequeteEncoursComponent,
    ListRequeteCloturesComponent,
    ListProjetsFinancesComponent,
    NouveauProjetPtfComponent,
    SuiviProjetPtfComponent,
    AdminPtfMenuComponent,
    FinanceAnnuelProjetComponent,
    NouveauAppuisBudgetairesComponent,
    ModifierAppuisBudgetairesComponent,
    ListAppuisBudgetairesComponent,
    DetailAppuisBudgetairesComponent
  ],
  imports: [
    CommonModule,
    AdminPtfRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    Ng2SearchPipeModule,
    NgZorroAntdModule,
    SharedModule,
    RequeteFinancementModule,
    ProjetModule,
    TableModule

  ]
})
export class AdminPtfModule { }
