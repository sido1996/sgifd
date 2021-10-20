import { NgModule } from '@angular/core';
import {CooperationDecentraliseeComponent} from "./cooperation-decentralisee.component";
import {CooperationDecentraliseeRoutingModule} from "./cooperation-decentralisee-routing.module";
import { NouveauCooperationComponent } from './nouveau-cooperation/nouveau-cooperation.component';
import { ModifierCooperationComponent } from './modifier-cooperation/modifier-cooperation.component';
import { DetailCooperationComponent } from './detail-cooperation/detail-cooperation.component';
import { ListCooperationComponent } from './list-cooperation/list-cooperation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {DataTableModule} from "ng-angular8-datatable";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { TbCooperationDecentraliseeComponent } from './tb-cooperation-decentralisee/tb-cooperation-decentralisee.component';
import {ProjetModule} from "../projet/projet.module";


const COOPERATION_DECENTRALISEE_COMPONENTS = [
  CooperationDecentraliseeComponent,
];

@NgModule({
  imports: [
    CooperationDecentraliseeRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule,
    DataTableModule,
    Ng2SearchPipeModule,
    FormsModule,

    ProjetModule,
  ],
  declarations: [
    ...COOPERATION_DECENTRALISEE_COMPONENTS,
    CooperationDecentraliseeComponent,
    NouveauCooperationComponent,
    ModifierCooperationComponent,
    DetailCooperationComponent,
    ListCooperationComponent,
    TbCooperationDecentraliseeComponent
  ],
})
export class CooperationDecentraliseeModule {
}
