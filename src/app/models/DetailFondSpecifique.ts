import {Commune} from "./Commune";
import { DeviseMonaie } from './DeviseMonaie';
import { ProjetProgramme } from './ProjetProgramme';

export class DetailFondSpecifique {
  id: number;
  montantDevise:	number;
  montantFcfa:	number;
  deviseMonnaie: DeviseMonaie;
  projetProgramme: ProjetProgramme;
  createBy:	string;
  deleteBy:	string;

  constructor(id: number, montantDevise:	number, montantFcfa:	number, 
    deviseMonnaie: DeviseMonaie,projetProgramme: ProjetProgramme,
    createBy: string, deleteBy: string) {
    this.id = id;
    this.montantDevise = montantDevise;
    this.montantFcfa = montantFcfa;
    this.deviseMonnaie = deviseMonnaie;
    this.projetProgramme = projetProgramme;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
}
