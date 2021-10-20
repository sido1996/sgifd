import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CooperationDecentraliseeRoutingModule } from './cooperation-decentralisee-routing.module';
import { CooperationDecentraliseeComponent } from './cooperation-decentralisee.component';
import { NouveauComponent } from './nouveau/nouveau.component';
import { ListComponent } from './list/list.component';
import { ModifierComponent } from './modifier/modifier.component';
import { DetailComponent } from './detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'ng-angular8-datatable';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {ProjetModule} from "../../admin/projet/projet.module";

@NgModule({
  declarations: [
    CooperationDecentraliseeComponent,
    NouveauComponent,
    ListComponent,
    ModifierComponent,
    DetailComponent],
  imports: [
    CommonModule,
    CooperationDecentraliseeRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DataTableModule,
    Ng2SearchPipeModule,
    ProjetModule,
    FormsModule
  ]
})
export class CooperationDecentraliseModule { }
