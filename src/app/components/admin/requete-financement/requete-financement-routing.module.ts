import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RequeteFinancementComponent} from "./requete-financement.component";
import {NouvelleRequeteComponent} from "./nouvelle-requete/nouvelle-requete.component";
import {ListRequeteComponent} from "./list-requete/list-requete.component";
import {ListClotureComponent} from "./list-cloture/list-cloture.component";
import {DetailRequeteComponent} from "./detail-requete/detail-requete.component";
import { TbRequeteFinancementComponent } from './tb-requete-financement/tb-requete-financement.component';
import {DetailProjetSuiviComponent} from "../projet/detail-projet-suivi/detail-projet-suivi.component";

const routes: Routes = [{
  path: '',
  component: RequeteFinancementComponent,
  children: [
    {
      path: 'parametre',
      loadChildren: () => import('../parametrage/parametrage.module').then(m => m.ParametrageModule),
    },

    {path: '', component: TbRequeteFinancementComponent,},
    {path: 'nouvelle-requete', component: NouvelleRequeteComponent,},
    {path: 'modifier-requete/:paramKey', component: NouvelleRequeteComponent,},
    {path: 'detail-requete/:paramKey', component: DetailRequeteComponent,},
    {path: 'list-requete', component: ListRequeteComponent,},
    {path: 'list-cloture', component: ListClotureComponent,},
    {path: 'detail-projet/:paramKey', component: DetailProjetSuiviComponent,},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequeteFinancementRoutingModule {
}
