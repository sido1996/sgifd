import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppuiBudgetaireStructureExterneRoutingModule } from './appui-budgetaire-structure-externe-routing.module';
import { AppuiBudgetaireStructureExterneComponent } from './appui-budgetaire-structure-externe.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NouveauAppuiComponent } from './nouveau-appui/nouveau-appui.component';
import { ListAppuiComponent } from './list-appui/list-appui.component';
import { ModifierAppuiComponent } from './modifier-appui/modifier-appui.component';
import { DetailAppuiComponent } from './detail-appui/detail-appui.component';

@NgModule({
  declarations: [
    AppuiBudgetaireStructureExterneComponent,
    NouveauAppuiComponent,
    ListAppuiComponent,
    ModifierAppuiComponent,
    DetailAppuiComponent
  ],
  imports: [
    CommonModule,
    AppuiBudgetaireStructureExterneRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DataTableModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class AppuiBudgetaireStructureExterneModule { }
