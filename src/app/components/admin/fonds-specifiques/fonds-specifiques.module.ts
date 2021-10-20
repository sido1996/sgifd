import { NgModule } from '@angular/core';
import {FondsSpecifiquesComponent} from "./fonds-specifiques.component";
import {FondsSpecifiquesRoutingModule} from "./fonds-specifiques-routing.module";
import {NouveauFondComponent} from "./nouveau-fond/nouveau-fond.component";
import {ModifierFondComponent} from "./modifier-fond/modifier-fond.component";
import {ListFondComponent} from "./list-fond/list-fond.component";
import { DetailFondComponent } from './detail-fond/detail-fond.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {DataTableModule} from "ng-angular8-datatable";
import {Ng2SearchPipeModule} from "ng2-search-filter";


const FONDS_SPECIFIQUES_COMPONENTS = [
  FondsSpecifiquesComponent,
];

@NgModule({
  imports: [
    FondsSpecifiquesRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule,
    DataTableModule,
    Ng2SearchPipeModule,
    FormsModule,
  ],
  declarations: [
    ...FONDS_SPECIFIQUES_COMPONENTS,
    NouveauFondComponent,
    ModifierFondComponent,
    ListFondComponent,
    DetailFondComponent
  ],
})
export class FondsSpecifiquesModule {
}
