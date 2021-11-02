import { NgModule } from '@angular/core';
import {ParametrageComponent} from "./parametrage.component";
import {ParametrageRoutingModule} from "./parametrage-routing.module";
import { ExerciceComponent } from './exercice/exercice.component';
import { ObjectifOddComponent } from './objectif-odd/objectif-odd.component';
import { PilierPagComponent } from './pilier-pag/pilier-pag.component';
import { TypeAccordComponent } from './type-accord/type-accord.component';
import { SecteurComponent } from './secteur/secteur.component';
import { SousSecteurComponent } from './sous-secteur/sous-secteur.component';
import { StructureComponent } from './structure/structure.component';
import { PtfFournisseurComponent } from './ptf-fournisseur/ptf-fournisseur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import { FiliereBourseComponent } from './filiere-bourse/filiere-bourse.component';
import { CycleBourseComponent } from './cycle-bourse/cycle-bourse.component';
import { TypeAssistanceComponent } from './type-assistance/type-assistance.component';
import { CategoriePtfComponent } from './categorie-ptf/categorie-ptf.component';
import { RegroupementClubComponent } from './regroupement-club/regroupement-club.component';
import { DomainePtfComponent } from './domaine-ptf/domaine-ptf.component';
import {TypeStructureComponent} from "./type-structure/type-structure.component";
import {TypeCooperationComponent} from "./type-cooperation/type-cooperation.component";
import {PaysComponent} from "./pays/pays.component";
import {DepartementComponent} from "./departement/departement.component";
import {CommuneComponent} from "./commune/commune.component";
import {ArrondissementComponent} from "./arrondissement/arrondissement.component";
import { NiveauMaturiteProjetComponent } from './niveau-maturite-projet/niveau-maturite-projet.component';
import { ProjetIdeeComponent } from './projet-idee/projet-idee.component';
import { EnregitrementProjetIdeeComponent } from './projet-idee/enregitrement-projet-idee/enregitrement-projet-idee.component';
import { DetailProjetIdeeComponent } from './projet-idee/detail-projet-idee/detail-projet-idee.component';
import { DetailPtfFournisseurComponent } from './ptf-fournisseur/detail-ptf-fournisseur/detail-ptf-fournisseur.component';
import { DetailStructureComponent } from './structure/detail-structure/detail-structure.component';
import { ModificationProjetIdeeComponent } from './projet-idee/modification-projet-idee/modification-projet-idee.component';
import {DataTableModule} from "ng-angular8-datatable";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {en_US, NgZorroAntdModule, NZ_I18N} from "ng-zorro-antd";
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { GrandSecteurComponent } from './grand-secteur/grand-secteur.component';
import { NatureFinancementComponent } from './nature-financement/nature-financement.component';
import { EnvergureComponent } from './envergure/envergure.component';
import { TypeRessourceInterieureComponent } from './type-ressource-interieure/type-ressource-interieure.component';
import { DomaineActiviteComponent } from './domaine-activite/domaine-activite.component';
import { NatureAssistanceComponent } from './nature-assistance/nature-assistance.component';
import { DeviseMonaieComponent } from './devise-monaie/devise-monaie.component';
import { DeviseMonaieHistComponent } from './devise-monaie-hist/devise-monaie-hist.component';
import { CategorieProjetComponent } from './categorie-projet/categorie-projet.component';
import { CiblesComponent } from './cibles/cibles.component';
import { AxePrioritaireComponent } from './axe-prioritaire/axe-prioritaire.component';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { TypeAppreciationComponent } from './type-appreciation/type-appreciation.component';
import { TypeFondSpecifiqueComponent } from './type-fond-specifique/type-fond-specifique.component';
import { PromoteurComponent } from './promoteur/promoteur.component';
import { InformateurComponent } from './informateur/informateur.component';
import {ListProjetIdeeComponent} from "./projet-idee/list-projet-idee/list-projet-idee.component";
import { TypeAppuiBudgetaireComponent } from './type-appui-budgetaire/type-appui-budgetaire.component';
import { ContinentComponent } from './continent/continent.component';
import { ZoneLocaliteComponent } from './zone-localite/zone-localite.component';
import { StatusAccordComponent } from './status-accord/status-accord.component';
import { DocumentProgrammatiqueComponent } from './document-programmatique/document-programmatique.component';
import { NatureAideAlimentaireComponent } from './nature-aide-alimentaire/nature-aide-alimentaire.component';
registerLocaleData(en);


const PARAMETRAGE_COMPONENTS = [
  ParametrageComponent,
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ParametrageRoutingModule,
    CommonModule,
    DataTableModule,
    Ng2SearchPipeModule,
    NgZorroAntdModule
  ],
  declarations: [
    ...PARAMETRAGE_COMPONENTS,
    ExerciceComponent,
    ObjectifOddComponent,
    PilierPagComponent,
    TypeAccordComponent,
    SecteurComponent,
    SousSecteurComponent,
    StructureComponent,
    PtfFournisseurComponent,
    FiliereBourseComponent,
    CycleBourseComponent,
    TypeAssistanceComponent,
    CategoriePtfComponent,
    RegroupementClubComponent,
    DomainePtfComponent,
    TypeStructureComponent,
    TypeCooperationComponent,
    PaysComponent,
    DepartementComponent,
    CommuneComponent,
    ArrondissementComponent,
    NiveauMaturiteProjetComponent,
    ProjetIdeeComponent,
    EnregitrementProjetIdeeComponent,
    DetailProjetIdeeComponent,
    DetailPtfFournisseurComponent,
    DetailStructureComponent,
    ModificationProjetIdeeComponent,
    GrandSecteurComponent,
    NatureFinancementComponent,
    EnvergureComponent,
    TypeRessourceInterieureComponent,
    DomaineActiviteComponent,
    NatureAssistanceComponent,
    DeviseMonaieComponent,
    DeviseMonaieHistComponent,
    CategorieProjetComponent,
    CiblesComponent,
    AxePrioritaireComponent,
    TypeAppreciationComponent,
    TypeFondSpecifiqueComponent,
    PromoteurComponent,
    InformateurComponent,
    ListProjetIdeeComponent,
    TypeAppuiBudgetaireComponent,
    ContinentComponent,
    ZoneLocaliteComponent,
    StatusAccordComponent,
    DocumentProgrammatiqueComponent,
    NatureAideAlimentaireComponent,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
})
export class ParametrageModule {
}
