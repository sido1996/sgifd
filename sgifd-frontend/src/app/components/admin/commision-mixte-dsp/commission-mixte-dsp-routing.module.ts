import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommisionMixteDspComponent} from "./commision-mixte-dsp.component";
import { DetailCommissionMixteDspComponent } from './detail-commission-mixte-dsp/detail-commission-mixte-dsp.component';
import { ListCommissionMixteDspComponent } from './list-commission-mixte-dsp/list-commission-mixte-dsp.component';
import { ModifierCommissionMixteDspComponent } from './modifier-commission-mixte-dsp/modifier-commission-mixte-dsp.component';
import { NouveauCommissionMixteDspComponent } from './nouveau-commission-mixte-dsp/nouveau-commission-mixte-dsp.component';

const routes: Routes = [{
  path: '',
  component: CommisionMixteDspComponent,
  children: [
    {
      path: 'parametre',
      loadChildren: () => import('../parametrage/parametrage.module').then(m => m.ParametrageModule),
    },
    {      
      path: 'detail-commission-mixte-dsp/:paramKey',
      component: DetailCommissionMixteDspComponent
    },
    {      
      path: 'list-commission-mixte-dsp',
      component: ListCommissionMixteDspComponent
    },
    {      
      path: 'modifier-commission-mixte-dsp/:paramKey',
      component: ModifierCommissionMixteDspComponent
    },
    {      
      path: 'nouveau-commission-mixte-dsp',
      component: NouveauCommissionMixteDspComponent
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommissionMixteDspRoutingModule {
}
