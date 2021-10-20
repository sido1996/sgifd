import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetStructureRoutingModule } from './projet-structure-routing.module';
import { ProjetStructureComponent } from './projet-structure.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DataTableModule } from 'ng-angular8-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListProjetEncoursComponent } from './list-projet-encours/list-projet-encours.component';
import { ListProjetCloturerComponent } from './list-projet-cloturer/list-projet-cloturer.component';
import {TableModule} from "primeng-lts/table";
import {ProjetModule} from "../../admin/projet/projet.module";

@NgModule({
  declarations: [
    ProjetStructureComponent,
    ListProjetEncoursComponent,
    ListProjetCloturerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProjetStructureRoutingModule,
    ReactiveFormsModule,
    DataTableModule,
    Ng2SearchPipeModule,
    NgZorroAntdModule,
    TableModule,
    ProjetModule,
  ]
})
export class ProjetStructureModule { }
