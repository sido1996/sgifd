import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AccordsComponent } from './accords.component';
import { NouveauAccordComponent } from './nouveau-accord/nouveau-accord.component';
import { ModifierAccordComponent } from './modifier-accord/modifier-accord.component';
import { DetailAccordComponent } from './detail-accord/detail-accord.component';
import { ListAccordComponent } from './list-accord/list-accord.component';
import { AuthGuard } from '../../../utils/AuthGuard';
import { TbAccordComponent } from './tb-accord/tb-accord.component';

const routes: Routes = [
  {
    path: '',
    component: AccordsComponent,
    children: [
      {
        path: 'parametre',
        loadChildren: () => import('../parametrage/parametrage.module').then(m => m.ParametrageModule),
      },

      { path: '', component: TbAccordComponent, },
      { path: 'nouveau-accord', component: NouveauAccordComponent, },
      { path: 'modifier-accord/:paramKey', component: ModifierAccordComponent, },
      { path: 'detail-accord/:paramKey', component: DetailAccordComponent, },
      { path: 'list-accord', component: ListAccordComponent, },
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccordRoutingModule {
}
