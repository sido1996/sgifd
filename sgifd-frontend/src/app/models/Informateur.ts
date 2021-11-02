import { Structure } from "./Structure";

export class Informateur {
  id: number;
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  profession: string;
  createBy: string;
  deleteBy: string;
  sourceInformation: Structure;

  constructor(id: number, nom: string, prenom: string, tel: string,
    email: string, profession: string, createBy: string, deleteBy: string,
    sousrceInformation: Structure) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.tel = tel;
    this.email = email;
    this.profession = profession;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.sourceInformation = sousrceInformation;
  }
}
