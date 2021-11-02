import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SearchProjetDoublonComponent } from './search-projet-doublon/search-projet-doublon.component';
import {TableModule} from "primeng/components/table/table";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule,
    TableModule,
  ],
  declarations: [
    SearchProjetDoublonComponent
  ],
  exports: [
    SearchProjetDoublonComponent
  ],
  entryComponents: [
    SearchProjetDoublonComponent
  ]
})
export class SharedModule {
}
