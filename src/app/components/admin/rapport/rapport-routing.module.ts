import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RapportComponent} from "./rapport.component";
import {NouveauRapportComponent} from "./nouveau-rapport/nouveau-rapport.component";
import {ModifierRapportComponent} from "./modifier-rapport/modifier-rapport.component";
import {ListRapportComponent} from "./list-rapport/list-rapport.component";
import {EditerRapportComponent} from "./editer-rapport/editer-rapport.component";
import {PointOddComponent} from "./point-odd/point-odd.component";

const routes: Routes = [
  { path: '', component: RapportComponent,
    children: [
      {path: 'nouveau-rapport', component: NouveauRapportComponent},
      {path: 'modifier-rapport/:paramKey', component: ModifierRapportComponent},
      {path: 'editer-rapport/:paramKey', component: EditerRapportComponent},
      {path: 'liste-rapport', component: ListRapportComponent},
      {path: 'point-odd', component: PointOddComponent},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RapportRoutingModule { }
