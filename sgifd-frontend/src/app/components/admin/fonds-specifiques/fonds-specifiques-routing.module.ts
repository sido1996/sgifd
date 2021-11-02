import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FondsSpecifiquesComponent} from "./fonds-specifiques.component";
import {NouveauAccordComponent} from "../accords/nouveau-accord/nouveau-accord.component";
import {ModifierAccordComponent} from "../accords/modifier-accord/modifier-accord.component";
import {NouveauFondComponent} from "./nouveau-fond/nouveau-fond.component";
import {ModifierFondComponent} from "./modifier-fond/modifier-fond.component";
import {ListFondComponent} from "./list-fond/list-fond.component";
import {DetailFondComponent} from "./detail-fond/detail-fond.component";
import { AuthGuard } from '../../../utils/AuthGuard';

const routes: Routes = [{
  path: '',
  component: FondsSpecifiquesComponent,
  children: [
    {
      path: 'parametre',
      loadChildren: () => import('../parametrage/parametrage.module').then(m => m.ParametrageModule),
    },
    {path: 'nouveau-fond-specifique', component: NouveauFondComponent,},
    {path: 'modifier-fond-specifique/:paramKey', component: ModifierFondComponent,},
    {path: 'detail-fond-specifique/:paramKey', component: DetailFondComponent,},
    {path: 'list-fond-specifique', component: ListFondComponent,},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FondsSpecifiquesRoutingModule {
}
