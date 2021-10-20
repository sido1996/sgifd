import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProjetComponent} from "./projet.component";
import {NouveauProjetComponent} from "./nouveau-projet/nouveau-projet.component";
import {DetailProjetSuiviComponent} from "./detail-projet-suivi/detail-projet-suivi.component";
import {ListProjetEncoursComponent} from "./list-projet-encours/list-projet-encours.component";
import {ListProjetCloturerComponent} from "./list-projet-cloturer/list-projet-cloturer.component";
import {SuiviFinanciereInterieureComponent} from "./suivi-financiere-interieure/suivi-financiere-interieure.component";
import {TbProjetComponent} from './tb-projet/tb-projet.component';
import {NouveauProjetStructureExterneComponent} from "./nouveau-projet-structure-externe/nouveau-projet-structure-externe.component";

const routes: Routes = [
  {
    path: '',
    component: ProjetComponent,
    children: [
      {
        path: 'parametre',
        loadChildren: () => import('../parametrage/parametrage.module').then(m => m.ParametrageModule),
      },
      {path: '', component: TbProjetComponent,},
      {path: 'enregistrer-projet', component: NouveauProjetComponent,},
      /*{path: 'modifier-projet/:paramKey', component: ModifierProjetComponent,},*/
      {path: 'detail-projet-suivi/:paramKey', component: DetailProjetSuiviComponent,},
      {path: 'suivi-financier', component: SuiviFinanciereInterieureComponent,},
      {path: 'suivi-financier/:paramKey', component: SuiviFinanciereInterieureComponent,},
      /*    {path: 'suivi-financier-exterieur', component: SuiviFinanciereExterieureComponent,},*/
      {path: 'list-projet-en-cours', component: ListProjetEncoursComponent,},
      {path: 'list-projet-cloturer', component: ListProjetCloturerComponent,},
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjetRoutingModule {
}
