import {Departement} from "./Departement";

export class Continent {
  id: number;
  libelle:	string;
  createBy:	string;
  deleteBy:	string;

  constructor(id: number, libelle: string, createBy: string, deleteBy: string) {
    this.id = id;
    this.libelle = libelle;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
}
