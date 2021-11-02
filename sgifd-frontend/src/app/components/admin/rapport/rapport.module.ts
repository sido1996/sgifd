import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RapportRoutingModule } from './rapport-routing.module';
import { RapportComponent } from './rapport.component';
import { ModifierRapportComponent } from './modifier-rapport/modifier-rapport.component';
import { ListRapportComponent } from './list-rapport/list-rapport.component';
import {NouveauRapportComponent} from "./nouveau-rapport/nouveau-rapport.component";
import { EditerRapportComponent } from './editer-rapport/editer-rapport.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTableModule} from "ng-angular8-datatable";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgZorroAntdModule} from "ng-zorro-antd";
import { PointOddComponent } from './point-odd/point-odd.component';

@NgModule({
  declarations: [RapportComponent, NouveauRapportComponent,
    ModifierRapportComponent, ListRapportComponent, EditerRapportComponent, PointOddComponent,],
  imports: [
    CommonModule,
    RapportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataTableModule,
    Ng2SearchPipeModule,
    NgZorroAntdModule
  ]
})
export class RapportModule { }
