export class ObjectifODD {
  id: number;
  libelle:	string;
  createBy:	string;
  deleteBy:	string;
  code:	string;

  constructor(id: number, libelle: string, createBy: string, deleteBy: string, code: string) {
    this.id = id;
    this.libelle = libelle;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.code = code;
  }
}
