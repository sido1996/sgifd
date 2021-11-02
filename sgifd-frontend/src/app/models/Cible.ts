import {ObjectifODD} from "./ObjectifODD";

export class Cible {
  id: number;
  libelle: string;
  createBy: string;
  deleteBy: string;
  odd: ObjectifODD;
  code: string;

  constructor(id: number, libelle: string, createBy: string, deleteBy: string, odd: ObjectifODD, code: string) {
    this.id = id;
    this.libelle = libelle;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.odd = odd;
    this.code = code;
  }
}
