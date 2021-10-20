import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {IdeComponent} from './ide.component';
import {IdeRoutingModule} from './ide-routing.module';
import { ListComponent } from './list/list.component';
import { NouveauComponent } from './nouveau/nouveau.component';
import { DetailComponent } from './detail/detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModifierIdeComponent } from './modifier-ide/modifier-ide.component';


const IDE_COMPONENTS = [
  IdeComponent,
];

@NgModule({
  imports: [
    IdeRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule,
    DataTableModule,
    Ng2SearchPipeModule,
    FormsModule,
  ],
  declarations: [
    ...IDE_COMPONENTS,
    IdeComponent,
    ListComponent,
    NouveauComponent,
    DetailComponent,
    ModifierIdeComponent
  ],
})
export class IdeModule {
}
