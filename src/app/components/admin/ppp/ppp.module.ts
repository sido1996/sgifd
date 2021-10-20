import { NgModule } from '@angular/core';
import { PppComponent } from "./ppp.component";
import { PppRoutingModule } from "./ppp-routing.module";
import { NouveauPppComponent } from './nouveau-ppp/nouveau-ppp.component';
import { ModifierPppComponent } from './modifier-ppp/modifier-ppp.component';
import { ListPppComponent } from './list-ppp/list-ppp.component';
import { DetailPppComponent } from './detail-ppp/detail-ppp.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


const PPP_COMPONENTS = [
  PppComponent,
];

@NgModule({
  imports: [
    PppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule,
    DataTableModule,
    Ng2SearchPipeModule,
    FormsModule,
  ],
  declarations: [
    ...PPP_COMPONENTS,
    PppComponent,
    NouveauPppComponent,
    ModifierPppComponent,
    ListPppComponent,
    DetailPppComponent
  ],
})
export class PppModule {
}
