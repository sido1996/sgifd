import {NiveauMaturite} from "./NiveauMaturite";
import {Secteur} from "./Secteur";
import {Exercice} from "./Exercice";

export class ProjetIdee {
  id: number;
  libelle: string;
  reference: string;
  niveaumaturite: NiveauMaturite;
  secteur: Secteur;
  objectifs: string;
  difficultes: string;
  dureeProjet: number;
  dureeAnnees: Array<Exercice>;

  constructor(id: number, libelle: string, reference: string, niveaumaturite: NiveauMaturite, secteur: Secteur, objectifs: string, difficultes: string) {
    this.id = id;
    this.libelle = libelle;
    this.reference = reference;
    this.niveaumaturite = niveaumaturite;
    this.secteur = secteur;
    this.objectifs = objectifs;
    this.difficultes = difficultes;
  }
}
