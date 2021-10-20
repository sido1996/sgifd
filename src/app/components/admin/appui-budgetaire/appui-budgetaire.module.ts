import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppuiBudgetaireRoutingModule } from './appui-budgetaire-routing.module';
import { AppuiBudgetaireComponent } from './appui-budgetaire.component';
import { NouveauAppuiBudgetaireComponent } from './nouveau-appui-budgetaire/nouveau-appui-budgetaire.component';
import { ListAppuiBudgetaireComponent } from './list-appui-budgetaire/list-appui-budgetaire.component';
import { ModifierAppuiBudgetaireComponent } from './modifier-appui-budgetaire/modifier-appui-budgetaire.component';
import { DetailAppuiBudgetaireComponent } from './detail-appui-budgetaire/detail-appui-budgetaire.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppuiBudgetaireComponent,
    NouveauAppuiBudgetaireComponent,
    ListAppuiBudgetaireComponent,
    ModifierAppuiBudgetaireComponent,
    DetailAppuiBudgetaireComponent
  ],
  imports: [
    CommonModule,
    AppuiBudgetaireRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DataTableModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class AppuiBudgetaireModule { }
