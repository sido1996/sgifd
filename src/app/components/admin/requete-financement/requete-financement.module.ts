import { NgModule } from '@angular/core';
import {RequeteFinancementComponent} from "./requete-financement.component";
import {RequeteFinancementRoutingModule} from "./requete-financement-routing.module";
import { NouvelleRequeteComponent } from './nouvelle-requete/nouvelle-requete.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ParametrageRoutingModule} from "../parametrage/parametrage-routing.module";
import {CommonModule} from "@angular/common";
import {DataTableModule} from "ng-angular8-datatable";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {en_US, NgZorroAntdModule, NZ_I18N} from "ng-zorro-antd";
import { ListRequeteComponent } from './list-requete/list-requete.component';
import { ListClotureComponent } from './list-cloture/list-cloture.component';
import { DetailRequeteComponent } from './detail-requete/detail-requete.component';
import { SharedModule } from '../../shared/shared.module';
import { TbRequeteFinancementComponent } from './tb-requete-financement/tb-requete-financement.component';
import {ProjetModule} from "../projet/projet.module";
import {TableModule} from "primeng/components/table/table";


const REQUETE_FINANCEMENT_COMPONENTS = [
  RequeteFinancementComponent,
];

@NgModule({
  imports: [
    RequeteFinancementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataTableModule,
    Ng2SearchPipeModule,
    NgZorroAntdModule,
    ProjetModule,
    TableModule,
    SharedModule,
  ],
  declarations: [
    ...REQUETE_FINANCEMENT_COMPONENTS,
    RequeteFinancementComponent,
    NouvelleRequeteComponent,
    ListRequeteComponent,
    ListClotureComponent,
    DetailRequeteComponent,
    TbRequeteFinancementComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
  exports: [
    DetailRequeteComponent
  ]
})
export class RequeteFinancementModule {
}
