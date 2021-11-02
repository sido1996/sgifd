import { Arrondissement } from './Arrondissement';

export class ZoneLocalite {
  id: number;
  libelle: string;
  createBy:	string;
  deleteBy:	string;
  arrondissement: Arrondissement;

  constructor(id: number, libelle: string, createBy: string, deleteBy: string , arrondissement: Arrondissement) {
    this.id = id;
    this.libelle = libelle;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.arrondissement = arrondissement;
  }
}
