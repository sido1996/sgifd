import { NgModule } from '@angular/core';
import {AccordsComponent} from "./accords.component";
import {AccordRoutingModule} from "./accord-routing.module";
import { NouveauAccordComponent } from './nouveau-accord/nouveau-accord.component';
import { ModifierAccordComponent } from './modifier-accord/modifier-accord.component';
import { ListAccordComponent } from './list-accord/list-accord.component';
import { DetailAccordComponent } from './detail-accord/detail-accord.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DataTableModule} from "ng-angular8-datatable";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgZorroAntdModule} from "ng-zorro-antd";
import { TbAccordComponent } from './tb-accord/tb-accord.component';


const ACCORD_COMPONENTS = [
  AccordsComponent,
];

@NgModule({
  imports: [
    AccordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataTableModule,
    Ng2SearchPipeModule,
    NgZorroAntdModule
  ],
  declarations: [
    ...ACCORD_COMPONENTS,
    NouveauAccordComponent,
    ModifierAccordComponent,
    ListAccordComponent,
    DetailAccordComponent,
    TbAccordComponent
  ],
})
export class AccordModule {
}
