import {NatureFinancement} from "./NatureFinancement";
import {RessourceExterieure} from "./RessourceExterieure";

export class ReponseRequeteFinancement {
  id: number;
  libelle:	string;
  dateReponse: string;
  montantRessourceProgrammer: number;
  natureFinancement: NatureFinancement;
  ressourceExterieureRequete: RessourceExterieure;
  createBy:	string;
  deleteBy:	string;

  constructor(id: number, libelle: string,
    dateReponse: string, montantRessourceProgrammer: number, natureFinancement: NatureFinancement,
     ressourceExterieureRequete: RessourceExterieure, createBy: string, deleteBy: string) {
    this.id = id;
    this.libelle = libelle;
    this.dateReponse = dateReponse;
    this.montantRessourceProgrammer = montantRessourceProgrammer;
    this.natureFinancement = natureFinancement;
    this.ressourceExterieureRequete = ressourceExterieureRequete;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
}
