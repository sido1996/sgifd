import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AideAlimentaireRoutingModule } from './aide-alimentaire-routing.module';
import { AideAlimentaireComponent } from './aide-alimentaire.component';
import { NouveauComponent } from './nouveau/nouveau.component';
import { ListComponent } from './list/list.component';
import { ModifierComponent } from './modifier/modifier.component';
import { DetailComponent } from './detail/detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NouveauBourseComponent } from './bourse/nouveau-bourse/nouveau-bourse.component';
import { ListBourseComponent } from './bourse/list-bourse/list-bourse.component';
import { ModifierBourseComponent } from './bourse/modifier-bourse/modifier-bourse.component';
import { DetailBourseComponent } from './bourse/detail-bourse/detail-bourse.component';
import {TableModule} from "primeng/components/table/table";

@NgModule({
  declarations: [
    AideAlimentaireComponent,
    NouveauComponent,
    ListComponent,
    ModifierComponent,

    DetailComponent,
    NouveauBourseComponent,
    ListBourseComponent,
    ModifierBourseComponent,

    DetailBourseComponent
  ],
  imports: [
    CommonModule,
    AideAlimentaireRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule,
    DataTableModule,
    Ng2SearchPipeModule,
    TableModule,
    FormsModule
  ]
})
export class AideAlimentaireModule { }
