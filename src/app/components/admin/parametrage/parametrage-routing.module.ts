import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ParametrageComponent } from './parametrage.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { SecteurComponent } from './secteur/secteur.component';
import { ObjectifOddComponent } from './objectif-odd/objectif-odd.component';
import { DomainePtfComponent } from './domaine-ptf/domaine-ptf.component';
import { TypeAccordComponent } from './type-accord/type-accord.component';
import { PilierPagComponent } from './pilier-pag/pilier-pag.component';
import { TypeCooperationComponent } from './type-cooperation/type-cooperation.component';
import { TypeAssistanceComponent } from './type-assistance/type-assistance.component';
import { RegroupementClubComponent } from './regroupement-club/regroupement-club.component';
import { CategoriePtfComponent } from './categorie-ptf/categorie-ptf.component';
import { PtfFournisseurComponent } from './ptf-fournisseur/ptf-fournisseur.component';
import { SousSecteurComponent } from './sous-secteur/sous-secteur.component';
import { StructureComponent } from './structure/structure.component';
import { TypeStructureComponent } from './type-structure/type-structure.component';
import { NiveauMaturiteProjetComponent } from './niveau-maturite-projet/niveau-maturite-projet.component';
import { ProjetIdeeComponent } from './projet-idee/projet-idee.component';
import { PaysComponent } from './pays/pays.component';
import { DepartementComponent } from './departement/departement.component';
import { CommuneComponent } from './commune/commune.component';
import { ArrondissementComponent } from './arrondissement/arrondissement.component';
import { CycleBourseComponent } from './cycle-bourse/cycle-bourse.component';
import { FiliereBourseComponent } from './filiere-bourse/filiere-bourse.component';
import { EnregitrementProjetIdeeComponent } from './projet-idee/enregitrement-projet-idee/enregitrement-projet-idee.component';
import { DomaineActiviteComponent } from './domaine-activite/domaine-activite.component';
import { CategorieProjetComponent } from './categorie-projet/categorie-projet.component';
import { GrandSecteurComponent } from './grand-secteur/grand-secteur.component';
import { EnvergureComponent } from './envergure/envergure.component';
import { NatureAssistanceComponent } from './nature-assistance/nature-assistance.component';
import { NatureFinancementComponent } from './nature-financement/nature-financement.component';
import { TypeRessourceInterieureComponent } from './type-ressource-interieure/type-ressource-interieure.component';
import { DeviseMonaieComponent } from './devise-monaie/devise-monaie.component';
import { DeviseMonaieHistComponent } from './devise-monaie-hist/devise-monaie-hist.component';
import { CiblesComponent } from './cibles/cibles.component';
import { AxePrioritaireComponent } from './axe-prioritaire/axe-prioritaire.component';
import { TypeAppreciationComponent } from './type-appreciation/type-appreciation.component';
import { TypeFondSpecifiqueComponent } from './type-fond-specifique/type-fond-specifique.component';
import { PromoteurComponent } from './promoteur/promoteur.component';
import { InformateurComponent } from './informateur/informateur.component';
import { ModificationProjetIdeeComponent } from './projet-idee/modification-projet-idee/modification-projet-idee.component';
import { ListProjetIdeeComponent } from './projet-idee/list-projet-idee/list-projet-idee.component';
import { DetailProjetIdeeComponent } from './projet-idee/detail-projet-idee/detail-projet-idee.component';
import { TypeAppuiBudgetaireComponent } from './type-appui-budgetaire/type-appui-budgetaire.component';
import { ContinentComponent } from './continent/continent.component';
import { ZoneLocaliteComponent } from './zone-localite/zone-localite.component';
import {StatusAccordComponent} from "./status-accord/status-accord.component";
import {DocumentProgrammatiqueComponent} from "./document-programmatique/document-programmatique.component";
import {NatureAideAlimentaireComponent} from "./nature-aide-alimentaire/nature-aide-alimentaire.component";

const routes: Routes = [
  { path: 'statut-accord', component: StatusAccordComponent, },
  { path: 'exercice', component: ExerciceComponent, },
  { path: 'secteur', component: SecteurComponent, },
  { path: 'sous-secteur', component: SousSecteurComponent, },
  { path: 'objectif-odd', component: ObjectifOddComponent, },
  { path: 'types-accord', component: TypeAccordComponent, },
  { path: 'piliers-pag', component: PilierPagComponent, },
  { path: 'type-cooperation', component: TypeCooperationComponent, },
  { path: 'type-assistance', component: TypeAssistanceComponent, },
  { path: 'nature-aide-alimentaire', component: NatureAideAlimentaireComponent, },
  { path: 'type-appui-budgetaire', component: TypeAppuiBudgetaireComponent, },
  { path: 'continent', component: ContinentComponent, },
  { path: 'zone-localite', component: ZoneLocaliteComponent, },


  { path: 'regroupement-club-ptf', component: RegroupementClubComponent, },
  { path: 'domaine-ptf', component: DomainePtfComponent, },
  { path: 'categorie-ptf', component: CategoriePtfComponent, },
  { path: 'ptf-fournisseur-bailleur-donateur', component: PtfFournisseurComponent, },

  { path: 'type-structure', component: TypeStructureComponent, },
  { path: 'domaine-activite', component: DomaineActiviteComponent, },
  { path: 'structure', component: StructureComponent, },

  { path: 'niveau-maturite', component: NiveauMaturiteProjetComponent, },
  { path: 'type-ressources-interieures', component: TypeRessourceInterieureComponent, },
  { path: 'categorie-projet', component: CategorieProjetComponent, },

  { path: 'cycle-bourse-formation', component: CycleBourseComponent, },
  { path: 'filiere-bourse-formation', component: FiliereBourseComponent, },

  { path: 'pays', component: PaysComponent, },
  { path: 'departement', component: DepartementComponent, },
  { path: 'commune', component: CommuneComponent, },
  { path: 'arrondissement', component: ArrondissementComponent, },

  { path: 'grand-secteur', component: GrandSecteurComponent, },
  { path: 'envergure', component: EnvergureComponent, },
  { path: 'nature-assistance', component: NatureAssistanceComponent, },
  { path: 'nature-financement', component: NatureFinancementComponent, },
  { path: 'devise-monaie', component: DeviseMonaieComponent, },
  { path: 'devise-monaie-hist', component: DeviseMonaieHistComponent, },
  { path: 'cible', component: CiblesComponent, },
  { path: 'axe-prioritaire', component: AxePrioritaireComponent, },
  { path: 'document-programmatique', component: DocumentProgrammatiqueComponent, },

  { path: 'type-appreciation', component: TypeAppreciationComponent, },
  { path: 'type-fond-specifique', component: TypeFondSpecifiqueComponent, },
  { path: 'promoteur', component: PromoteurComponent, },
  { path: 'informateur', component: InformateurComponent, },

  { path: 'list-projet-idee', component: ListProjetIdeeComponent, },
  { path: 'nouveau-projet-idee', component: EnregitrementProjetIdeeComponent, },
  { path: 'modifier-projet-idee:/paramKey', component: ModificationProjetIdeeComponent, },
  { path: 'detail-projet-idee:/paramKey', component: DetailProjetIdeeComponent, },

  {
    path: '', component: ParametrageComponent,
    children: [
      { path: 'statut-accord-param', component: StatusAccordComponent, },
      { path: 'exercice-param', component: ExerciceComponent, },
      { path: 'secteur-param', component: SecteurComponent, },
      { path: 'sous-secteur-param', component: SousSecteurComponent, },
      { path: 'objectif-odd-param', component: ObjectifOddComponent, },
      { path: 'types-accord-param', component: TypeAccordComponent, },
      { path: 'piliers-pag-param', component: PilierPagComponent, },
      { path: 'type-cooperation-param', component: TypeCooperationComponent, },
      { path: 'type-assistance-param', component: TypeAssistanceComponent, },
      { path: 'nature-aide-alimentaire-param', component: NatureAideAlimentaireComponent, },
      { path: 'type-appui-budgetaire-param', component: TypeAppuiBudgetaireComponent, },
      { path: 'continent-param', component: ContinentComponent, },
      { path: 'zone-localite-param', component: ZoneLocaliteComponent, },

      { path: 'regroupement-club-ptf-param', component: RegroupementClubComponent, },
      { path: 'domaine-ptf-param', component: DomainePtfComponent, },
      { path: 'categorie-ptf-param', component: CategoriePtfComponent, },
      { path: 'ptf-fournisseur-bailleur-donateur-param', component: PtfFournisseurComponent, },

      { path: 'type-structure-param', component: TypeStructureComponent, },
      { path: 'domaine-activite-param', component: DomaineActiviteComponent, },
      { path: 'structure-param', component: StructureComponent, },

      { path: 'niveau-maturite-param', component: NiveauMaturiteProjetComponent, },
      { path: 'categorie-projet-param', component: CategorieProjetComponent, },
      { path: 'nouveau-projet-idee-param', component: EnregitrementProjetIdeeComponent, },

      { path: 'pays-param', component: PaysComponent, },
      { path: 'departement-param', component: DepartementComponent, },
      { path: 'commune-param', component: CommuneComponent, },
      { path: 'arrondissement-param', component: ArrondissementComponent, },

      { path: 'cycle-bourse-formation-param', component: CycleBourseComponent, },
      { path: 'filiere-bourse-formation-param', component: FiliereBourseComponent, },

      { path: 'grand-secteur-param', component: GrandSecteurComponent, },
      { path: 'envergure-param', component: EnvergureComponent, },
      { path: 'nature-assistance-param', component: NatureAssistanceComponent, },
      { path: 'nature-financement-param', component: NatureFinancementComponent, },
      { path: 'devise-monaie-param', component: DeviseMonaieComponent, },
      { path: 'type-ressources-interieures-param', component: TypeRessourceInterieureComponent, },
      { path: 'devise-monaie-hist-param', component: DeviseMonaieHistComponent, },
      { path: 'cible-param', component: CiblesComponent, },
      { path: 'axe-prioritaire-param', component: AxePrioritaireComponent, },
      { path: 'document-programmatique-param', component: DocumentProgrammatiqueComponent, },

      { path: 'type-appreciation-param', component: TypeAppreciationComponent, },
      { path: 'type-fond-specifique-param', component: TypeFondSpecifiqueComponent, },
      { path: 'promoteur-param', component: PromoteurComponent, },
      { path: 'informateur-param', component: InformateurComponent, },

      { path: 'list-projet-idee-param', component: ListProjetIdeeComponent, },
      { path: 'nouveau-projet-idee-param', component: EnregitrementProjetIdeeComponent, },
      { path: 'modifier-projet-idee-param:/paramKey', component: ModificationProjetIdeeComponent, },
      { path: 'detail-projet-idee-param:/paramKey', component: DetailProjetIdeeComponent, },
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule],
})
export class ParametrageRoutingModule {
}
