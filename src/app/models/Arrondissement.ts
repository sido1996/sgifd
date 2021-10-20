import {Commune} from "./Commune";

export class Arrondissement {
  id: number;
  libelle:	string;
  createBy:	string;
  deleteBy:	string;
  commune: Commune;

  constructor(id: number, libelle: string, createBy: string, deleteBy: string, commune: Commune) {
    this.id = id;
    this.libelle = libelle;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.commune = commune;
  }
}
