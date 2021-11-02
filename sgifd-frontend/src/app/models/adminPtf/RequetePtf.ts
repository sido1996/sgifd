import { DeviseMonaie } from '../DeviseMonaie';
import { NatureAssistance } from '../NatureAssistance';
import { NatureFinancement } from '../NatureFinancement';
import { Exercice } from '../Exercice';

export class RequetePtf {
  idR: number;
  montantRessourceDevise: number;
  montantRessourceProgrammer: number;
  deviseMonnaie: DeviseMonaie;
  natureAssistance: NatureAssistance;
  natureFinancement: NatureFinancement;
  idP: number;
  libelle:	string;
  objectifgeneral:	string;
  objectifs:	string;
  annee:	Exercice;

  constructor(
    idR: number,
    montantRessourceDevise: number,
    montantRessourceProgrammer: number,
    deviseMonnaie: DeviseMonaie,
    natureAssistance: NatureAssistance,
    natureFinancement: NatureFinancement,
    idP: number,
    libelle:	string,
    objectifgeneral:	string,
    objectifs:	string,
    annee:	Exercice
  ) {
    this.idR = idR;
    this.montantRessourceDevise = montantRessourceDevise;
    this.montantRessourceProgrammer = montantRessourceProgrammer;
    this.deviseMonnaie = deviseMonnaie;
    this.natureAssistance = natureAssistance;
    this.natureFinancement = natureFinancement;
    this.idP = idP;
    this.libelle = libelle;
    this.objectifgeneral = objectifgeneral;
    this.objectifs = objectifs;
    this.annee = annee;
  }
}
