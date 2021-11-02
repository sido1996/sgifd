import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CooperationDecentraliseeComponent} from "./cooperation-decentralisee.component";
import {NouveauCooperationComponent} from "./nouveau-cooperation/nouveau-cooperation.component";
import {ModifierCooperationComponent} from "./modifier-cooperation/modifier-cooperation.component";
import {DetailCooperationComponent} from "./detail-cooperation/detail-cooperation.component";
import {ListCooperationComponent} from "./list-cooperation/list-cooperation.component";
import { TbCooperationDecentraliseeComponent } from './tb-cooperation-decentralisee/tb-cooperation-decentralisee.component';
import {NouveauProjetComponent} from "../projet/nouveau-projet/nouveau-projet.component";

const routes: Routes = [{
  path: '',
  component: CooperationDecentraliseeComponent,
  children: [
    {
      path: 'parametre',
      loadChildren: () => import('../parametrage/parametrage.module').then(m => m.ParametrageModule),
    },

    {path: '', component: TbCooperationDecentraliseeComponent,},
    {path: 'nouveau-cooperation', component: NouveauCooperationComponent,},
    {path: 'modifier-cooperation/:paramKey', component: ModifierCooperationComponent,},
    {path: 'detail-cooperation/:paramKey', component: DetailCooperationComponent,},
    {path: 'list-cooperation', component: ListCooperationComponent,},
    {path: 'nouveau-projet', component: NouveauProjetComponent,},

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CooperationDecentraliseeRoutingModule {
}
