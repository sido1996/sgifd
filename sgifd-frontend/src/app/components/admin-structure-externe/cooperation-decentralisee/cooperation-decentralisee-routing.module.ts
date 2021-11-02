import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CooperationDecentraliseeComponent } from './cooperation-decentralisee.component';
import { NouveauComponent } from './nouveau/nouveau.component';
import { ListComponent } from './list/list.component';
import { ModifierComponent } from './modifier/modifier.component';
import { DetailComponent } from './detail/detail.component';
import {NouveauProjetStructureExterneComponent} from "../../admin/projet/nouveau-projet-structure-externe/nouveau-projet-structure-externe.component";

const routes: Routes = [
  {
    path: '',
    component: CooperationDecentraliseeComponent,
    children: [
      {path: 'enregistrer-projet', component: NouveauProjetStructureExterneComponent,},
      {
        path: 'nouveau',
        component: NouveauComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'modifier/:paramKey',
        component: ModifierComponent
      },
      {
        path: 'detail/:paramKey',
        component: DetailComponent
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CooperationDecentraliseeRoutingModule { }
