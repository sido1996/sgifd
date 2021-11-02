
import {AxePrioritaire} from "./AxePrioritaire";
import {CategorieProjet} from "./CategorieProjet";
import {Cible} from "./Cible";
import {Structure} from "./Structure";
import {Secteur} from "./Secteur";
import {NiveauMaturite} from "./NiveauMaturite";

export class ProjetProgrammeIdee {
  id: number;
  reference: string;
  libelle: string;
  niveaumaturite: NiveauMaturite;
  secteur: Secteur;
  objectifs: string;
  cibles: Array<Cible>;
  coutGlobalProjet: number;
  categorieProjet: CategorieProjet;
  axePrioritaires: Array<AxePrioritaire>;
  structureSousTutelle: Structure;
  structureAgenceExecution: Structure;
  difficultes: string;

  constructor(id: number, reference: string, libelle: string, niveaumaturite: NiveauMaturite, secteur: Secteur, objectifs: string, cibles: Array<Cible>, coutGlobalProjet: number, categorieProjet: CategorieProjet, axePrioritaires: Array<AxePrioritaire>, structureSousTutelle: Structure, structureAgenceExecution: Structure, difficultes: string) {
    this.id = id;
    this.reference = reference;
    this.libelle = libelle;
    this.niveaumaturite = niveaumaturite;
    this.secteur = secteur;
    this.objectifs = objectifs;
    this.cibles = cibles;
    this.coutGlobalProjet = coutGlobalProjet;
    this.categorieProjet = categorieProjet;
    this.axePrioritaires = axePrioritaires;
    this.structureSousTutelle = structureSousTutelle;
    this.structureAgenceExecution = structureAgenceExecution;
    this.difficultes = difficultes;
  }
}
