import { NgModule } from '@angular/core';
import {CommisionMixteDspComponent} from "./commision-mixte-dsp.component";
import {CommissionMixteDspRoutingModule} from "./commission-mixte-dsp-routing.module";
import { NouveauCommissionMixteDspComponent } from './nouveau-commission-mixte-dsp/nouveau-commission-mixte-dsp.component';
import { ListCommissionMixteDspComponent } from './list-commission-mixte-dsp/list-commission-mixte-dsp.component';
import { ModifierCommissionMixteDspComponent } from './modifier-commission-mixte-dsp/modifier-commission-mixte-dsp.component';
import { DetailCommissionMixteDspComponent } from './detail-commission-mixte-dsp/detail-commission-mixte-dsp.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTableModule} from "ng-angular8-datatable";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {CommonModule} from "@angular/common";


const COMMISION_MIXTE_DSP_COMPONENTS = [
  CommisionMixteDspComponent,
];

@NgModule({
  imports: [
    CommissionMixteDspRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule,
    DataTableModule,
    Ng2SearchPipeModule,
    FormsModule,
  ],
  declarations: [
    ...COMMISION_MIXTE_DSP_COMPONENTS,
    NouveauCommissionMixteDspComponent,
    ListCommissionMixteDspComponent,
    ModifierCommissionMixteDspComponent,
    DetailCommissionMixteDspComponent,
  ],
})
export class CommisionMixteDspModule {
}
