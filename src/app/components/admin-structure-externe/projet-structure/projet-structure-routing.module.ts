import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetStructureComponent } from './projet-structure.component';
import { ListProjetEncoursComponent } from './list-projet-encours/list-projet-encours.component';
import { ListProjetCloturerComponent } from './list-projet-cloturer/list-projet-cloturer.component';
import {NouveauProjetStructureExterneComponent} from "../../admin/projet/nouveau-projet-structure-externe/nouveau-projet-structure-externe.component";
import {DetailProjetSuiviComponent} from "../../admin/projet/detail-projet-suivi/detail-projet-suivi.component";
import {SuiviFinanciereInterieureComponent} from "../../admin/projet/suivi-financiere-interieure/suivi-financiere-interieure.component";

const routes: Routes = [
  {
    path: '',
    component: ProjetStructureComponent,
    children: [
      {path: 'detail-projet-suivi/:paramKey', component: DetailProjetSuiviComponent,},
      {path: 'suivi-financier', component: SuiviFinanciereInterieureComponent,},
      {path: 'suivi-financier/:paramKey', component: SuiviFinanciereInterieureComponent,},
      {path: 'enregistrer-projet', component: NouveauProjetStructureExterneComponent,},

      {
        path: 'list-projet-en-cours',
        component: ListProjetEncoursComponent
      },
      {
        path: 'list-projet-cloturer',
        component: ListProjetCloturerComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetStructureRoutingModule { }
