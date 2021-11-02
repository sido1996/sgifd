import { ModifierAidesAlimentaireComponent } from './aides-alimentaire/modifier-aides-alimentaire/modifier-aides-alimentaire.component';
import { DetailAidesAlimentaireComponent } from './aides-alimentaire/detail-aides-alimentaire/detail-aides-alimentaire.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { AideSecoursComponent } from './aide-secours.component';
import { NouveauComponent } from './aides-alimentaire/nouveau/nouveau.component';
import { ListAidesAlimentairesComponent } from './aides-alimentaire/list-aides-alimentaires/list-aides-alimentaires.component';
import {NouveauAideCapitaleComponent} from "./aide-capitale-bourse-secours/nouveau-aide-capitale/nouveau-aide-capitale.component";
import {ListAideCapitaleComponent} from "./aide-capitale-bourse-secours/list-aide-capitale/list-aide-capitale.component";
import {DetailComponent} from "./aide-capitale-bourse-secours/detail/detail.component";
import {ModifierComponent} from "./aide-capitale-bourse-secours/modifier/modifier.component";
import {TbAideSecoursComponent} from "./tb-aide-secours/tb-aide-secours.component";

const routes: Routes = [{
  path: '',
  component: AideSecoursComponent,
  children: [
    {
      path: '',
      component: TbAideSecoursComponent,
    },
    {
      path: 'parametre',
      loadChildren: () => import('../parametrage/parametrage.module').then(m => m.ParametrageModule),
    },
    {
      path: 'nouveau-aides-alimentaires',
      component: NouveauComponent,
    },
    {
      path: 'list-aides-alimentaires',
      component: ListAidesAlimentairesComponent,
    },
    {
      path: 'detail-aides-alimentaire/:paramKey',
      component: DetailAidesAlimentaireComponent,
    },
    {
      path: 'modifier-aides-alimentaire/:paramKey',
      component: ModifierAidesAlimentaireComponent,
    },

    {
      path: 'nouveau-aide-capital-bourse',
      component: NouveauAideCapitaleComponent,
    },
    {
      path: 'list-aide-capital-bourse',
      component: ListAideCapitaleComponent,
    },
    {
      path: 'detail-aide-capital-bourse/:paramKey',
      component: DetailComponent,
    },
    {
      path: 'modifier-aide-capital-bourse/:paramKey',
      component: ModifierComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AideSecoursRoutingModule {
}
