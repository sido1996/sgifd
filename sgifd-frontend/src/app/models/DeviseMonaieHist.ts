import {DeviseMonaie} from "./DeviseMonaie";

export class DeviseMonaieHist {
  id: number;
  libelle:	string;
  createBy:	string;
  deleteBy:	string;
  dateConversion: string;
  montantEquivalent: number;
  deviseMonaie: DeviseMonaie;

  constructor(id: number, libelle: string, createBy: string, deleteBy: string, dateConversion: string, montantEquivalent: number, deviseMonaie: DeviseMonaie) {
    this.id = id;
    this.libelle = libelle;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.dateConversion = dateConversion;
    this.montantEquivalent = montantEquivalent;
    this.deviseMonaie = deviseMonaie;
  }
}
