import {Secteur} from "./Secteur";

export class SousSecteur {
  id: number;
  libelle:	string;
  createBy:	string;
  deleteBy:	string;
  secteur: Secteur;

  constructor(id: number, libelle: string, createBy: string, deleteBy: string, secteur: Secteur) {
    this.id = id;
    this.libelle = libelle;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.secteur = secteur;
  }
}
