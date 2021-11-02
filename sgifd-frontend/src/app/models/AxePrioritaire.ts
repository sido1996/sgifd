import {PilierPAG} from "./PilierPAG";

export class AxePrioritaire {
  id: number;
  libelle:	string;
  createBy:	string;
  deleteBy:	string;
  pilierPAG: PilierPAG;
  code:	string;

  constructor(id: number, libelle: string, createBy: string, deleteBy: string, pilierPAG: PilierPAG, code: string) {
    this.id = id;
    this.libelle = libelle;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.pilierPAG = pilierPAG;
    this.code = code;
  }
}
