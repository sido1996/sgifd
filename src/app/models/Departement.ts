import {Pays} from "./Pays";

export class Departement {
  id: number;
  libelle:	string;
  createBy:	string;
  deleteBy:	string;
  pays: Pays;

  constructor(id: number, libelle: string, createBy: string, deleteBy: string, pays: Pays) {
    this.id = id;
    this.libelle = libelle;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.pays = pays;
  }
}
