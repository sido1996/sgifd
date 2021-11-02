import { DeviseMonaie } from '../DeviseMonaie';
import { NatureFinancement } from '../NatureFinancement';

export class ProjetFinance {
   montantRessourceDevise: number;
  montantRessourceProgrammer: number;
  deviseMonnaie: DeviseMonaie;
  natureFinancement: NatureFinancement;
  idP: number;
  reference:	string;
  libelle:	string;

  constructor(
     montantRessourceDevise: number,
    montantRessourceProgrammer: number,
    deviseMonnaie: DeviseMonaie,
    natureFinancement: NatureFinancement,
    idP: number,
    reference:	string,
    libelle:	string,
  ) {
     this.montantRessourceDevise = montantRessourceDevise;
    this.montantRessourceProgrammer = montantRessourceProgrammer;
    this.deviseMonnaie = deviseMonnaie;
    this.natureFinancement = natureFinancement;
    this.idP = idP;
    this.reference = reference;
    this.libelle = libelle;
  }
}
