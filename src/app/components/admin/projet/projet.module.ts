import { NgModule } from '@angular/core';
import {ProjetComponent} from "./projet.component";
import {ProjetRoutingModule} from "./projet-routing.module";
import { NouveauProjetComponent } from './nouveau-projet/nouveau-projet.component';
import { DetailProjetSuiviComponent } from './detail-projet-suivi/detail-projet-suivi.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DataTableModule} from "ng-angular8-datatable";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgZorroAntdModule} from "ng-zorro-antd";
import { ListProjetEncoursComponent } from './list-projet-encours/list-projet-encours.component';
import { SuiviFinanciereInterieureComponent } from './suivi-financiere-interieure/suivi-financiere-interieure.component';
import { SuiviFinanciereExterieureComponent } from './suivi-financiere-exterieure/suivi-financiere-exterieure.component';
import { ListProjetCloturerComponent } from './list-projet-cloturer/list-projet-cloturer.component';
import { SharedModule } from '../../shared/shared.module';
import { TbProjetComponent } from './tb-projet/tb-projet.component';
import {TableModule} from "primeng/components/table/table";
import { NouveauProjetStructureExterneComponent } from './nouveau-projet-structure-externe/nouveau-projet-structure-externe.component';


const PROJET_COMPONENTS = [
  ProjetComponent,
];

@NgModule({
  imports: [
    ProjetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataTableModule,
    Ng2SearchPipeModule,
    NgZorroAntdModule,
    SharedModule,
    TableModule
  ],
  declarations: [
    ...PROJET_COMPONENTS,
    NouveauProjetComponent,
    DetailProjetSuiviComponent,
    ListProjetEncoursComponent,
    SuiviFinanciereInterieureComponent,
    SuiviFinanciereExterieureComponent,
    ListProjetCloturerComponent,
    TbProjetComponent,
    NouveauProjetStructureExterneComponent
  ],
  exports: [
    NouveauProjetComponent,
    NouveauProjetStructureExterneComponent,
    SuiviFinanciereInterieureComponent,
    SuiviFinanciereExterieureComponent,
    DetailProjetSuiviComponent,
  ]
})
export class ProjetModule {
}
