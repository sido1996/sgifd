export class NatureAssistance {
  id: number;
  libelle:	string;
  isAppui: boolean;
  createBy:	string;
  deleteBy:	string;

  constructor(id: number, libelle: string, isAppui: boolean, createBy: string, deleteBy: string) {
    this.id = id;
    this.libelle = libelle;
    this.isAppui = isAppui;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
}
