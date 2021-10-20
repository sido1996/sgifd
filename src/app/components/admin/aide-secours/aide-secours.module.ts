import { NgModule } from '@angular/core';
import { AideSecoursComponent } from './aide-secours.component';
import { AideSecoursRoutingModule } from './aide-secours-routing.module';
import { ListAidesAlimentairesComponent } from './aides-alimentaire/list-aides-alimentaires/list-aides-alimentaires.component';
import { ModifierAidesAlimentaireComponent } from './aides-alimentaire/modifier-aides-alimentaire/modifier-aides-alimentaire.component';
import { DetailAidesAlimentaireComponent } from './aides-alimentaire/detail-aides-alimentaire/detail-aides-alimentaire.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NouveauComponent } from './aides-alimentaire/nouveau/nouveau.component';
import { DetailComponent } from './aide-capitale-bourse-secours/detail/detail.component';
import { ModifierComponent } from './aide-capitale-bourse-secours/modifier/modifier.component';
import { ListAideCapitaleComponent } from './aide-capitale-bourse-secours/list-aide-capitale/list-aide-capitale.component';
import { NouveauAideCapitaleComponent } from './aide-capitale-bourse-secours/nouveau-aide-capitale/nouveau-aide-capitale.component';
import { TbAideSecoursComponent } from './tb-aide-secours/tb-aide-secours.component';
import {TableModule} from "primeng/components/table/table";



const AIDE_SECOURS_COMPONENTS = [
  AideSecoursComponent,
];

@NgModule({
  imports: [
    AideSecoursRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule,
    DataTableModule,
    Ng2SearchPipeModule,
    FormsModule,

    TableModule
  ],
  declarations: [
    ...AIDE_SECOURS_COMPONENTS,
    AideSecoursComponent,
    NouveauComponent,
    ListAidesAlimentairesComponent,
    ModifierAidesAlimentaireComponent,
    NouveauAideCapitaleComponent,
    DetailAidesAlimentaireComponent,
    DetailComponent,
    ModifierComponent,
    ListAideCapitaleComponent,
    TbAideSecoursComponent,
  ],
})
export class AideSecoursModule {



}
