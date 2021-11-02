import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStructureExterneRoutingModule } from './admin-structure-externe-routing.module';
import { AdminStructureExterneComponent } from './admin-structure-externe.component';
import { MenuStructureExterneComponent } from './menu-structure-externe/menu-structure-externe.component';

@NgModule({
  declarations: [
    AdminStructureExterneComponent,
    MenuStructureExterneComponent,
  ],
  imports: [
    CommonModule,
    AdminStructureExterneRoutingModule
  ]
})
export class AdminStructureExterneModule { }
