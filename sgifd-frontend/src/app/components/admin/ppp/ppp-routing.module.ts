import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PppComponent} from "./ppp.component";
import { DetailPppComponent } from './detail-ppp/detail-ppp.component';
import { ListPppComponent } from './list-ppp/list-ppp.component';
import { ModifierPppComponent } from './modifier-ppp/modifier-ppp.component';
import { NouveauPppComponent } from './nouveau-ppp/nouveau-ppp.component';

const routes: Routes = [{
  path: '',
  component: PppComponent,
  children: [
    {
      path: 'parametre',
      loadChildren: () => import('../parametrage/parametrage.module').then(m => m.ParametrageModule),
    },
    {
      path: 'detail-ppp/:paramKey',
      component: DetailPppComponent
    },
    {      
      path: 'list-ppp',
      component: ListPppComponent
    },
    {      
      path: 'modifier-ppp/:paramKey',
      component: ModifierPppComponent
    },
    {      
      path: 'nouveau-ppp',
      component: NouveauPppComponent
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PppRoutingModule {
}
