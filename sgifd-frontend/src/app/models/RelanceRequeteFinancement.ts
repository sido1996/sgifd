import {RequeteFinancement} from "./RequeteFinancement";
import {RessourceExterieure} from "./RessourceExterieure";

export class RelanceRequeteFinancement {
  id: number;
  libelle:	string;
  dateRelance: string;
  ressourceExterieureRequete: RessourceExterieure;
  createBy:	string;
  deleteBy:	string;

  constructor(id: number, libelle: string, dateRelance: string,
     ressourceExterieureRequete: RessourceExterieure, createBy: string, deleteBy: string) {
    this.id = id;
    this.libelle = libelle;
    this.dateRelance = dateRelance;
    this.ressourceExterieureRequete = ressourceExterieureRequete;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
}
