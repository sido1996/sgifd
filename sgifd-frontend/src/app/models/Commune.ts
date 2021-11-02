import {Departement} from "./Departement";

export class Commune {
  id: number;
  libelle:	string;
  createBy:	string;
  deleteBy:	string;
  departement: Departement;

  constructor(id: number, libelle: string, createBy: string, deleteBy: string, departement: Departement) {
    this.id = id;
    this.libelle = libelle;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.departement = departement;
  }
}
