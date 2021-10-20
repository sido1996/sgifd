import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AideAlimentaireComponent } from './aide-alimentaire.component';
import { NouveauComponent } from './nouveau/nouveau.component';
import { ListComponent } from './list/list.component';
import { ModifierComponent } from './modifier/modifier.component';
import { DetailComponent } from './detail/detail.component';
import { ListBourseComponent } from './bourse/list-bourse/list-bourse.component';
import { ModifierBourseComponent } from './bourse/modifier-bourse/modifier-bourse.component';
import { DetailBourseComponent } from './bourse/detail-bourse/detail-bourse.component';
import { NouveauBourseComponent } from './bourse/nouveau-bourse/nouveau-bourse.component';

const routes: Routes = [
  {
    path: '',
    component: AideAlimentaireComponent,
    children: [
      {
        path: 'nouveau',
        component: NouveauComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'modifier/:paramKey',
        component: ModifierComponent
      },
      {
        path: 'detail/:paramKey',
        component: DetailComponent
      },
      {
        path: 'nouveau-bourse',
        component: NouveauBourseComponent
      },
      {
        path: 'list-bourse',
        component: ListBourseComponent
      },
      {
        path: 'modifier-bourse/:paramKey',
        component: ModifierBourseComponent
      },
      {
        path: 'detail-bourse/:paramKey',
        component: DetailBourseComponent
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class AideAlimentaireRoutingModule { }
