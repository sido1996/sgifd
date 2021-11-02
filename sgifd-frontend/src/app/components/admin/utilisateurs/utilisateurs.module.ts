import { NgModule } from '@angular/core';

import {UtilisateursComponent} from "./utilisateurs.component";
import {UtilisateursRoutingModule} from "./utilisateurs-routing.module";
import { NouveauUserComponent } from './nouveau-user/nouveau-user.component';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { RoleUserComponent } from './role-user/role-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { ModuleSystemeComponent } from './module-systeme/module-systeme.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ParametrageRoutingModule} from "../parametrage/parametrage-routing.module";
import {CommonModule} from "@angular/common";
import {DataTableModule} from "ng-angular8-datatable";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {TableModule} from "primeng/components/table/table";


const UTILISATEUR_COMPONENTS = [
  UtilisateursComponent,
];

@NgModule({
  imports: [
    UtilisateursRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataTableModule,
    Ng2SearchPipeModule,
    NgZorroAntdModule,

    TableModule
  ],
  declarations: [
    ...UTILISATEUR_COMPONENTS,
    NouveauUserComponent,
    ModifierUserComponent,
    ListUserComponent,
    RoleUserComponent,
    DetailUserComponent,
    ModuleSystemeComponent,
  ],
})
export class UtilisateursModule {
}
