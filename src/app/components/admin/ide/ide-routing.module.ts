import { DetailComponent } from './detail/detail.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {IdeComponent} from "./ide.component";
import { NouveauComponent } from './nouveau/nouveau.component';
import { ListComponent } from './list/list.component';
import { ModifierIdeComponent } from './modifier-ide/modifier-ide.component';

const routes: Routes = [{
  path: '',
  component: IdeComponent,
  children: [
    {
      path: 'parametre',
      loadChildren: () => import('../parametrage/parametrage.module').then(m => m.ParametrageModule),
    },
    {
      path: 'nouveau-ide',
      component: NouveauComponent
    },
    {
      path: 'list-ide',
      component: ListComponent
    },
    {
      path: 'detail-ide/:paramKey',
      component: DetailComponent
    },
    {
      path: 'modifier-ide/:paramKey',
      component: ModifierIdeComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdeRoutingModule {
}
