import {Exercice} from "./Exercice";
import {RessourceExterieure} from "./RessourceExterieure";
import { DeviseMonaie } from './DeviseMonaie';

export class RessourceExterieureAnnuelle {
  id: number;
  libelle: string;
  annee: Exercice;
  deviseMonnaie: DeviseMonaie;
  ressourceExterieure: RessourceExterieure;
  montantRessourceProgrammer: number;
  montantRessourceApprouver: number;
  montantRessourceDecaisser: number;
  montantRessourceDecaisserFcfa: number;
  montantConsommeFcfa: number;

  constructor(id: number, libelle: string, annee: Exercice, deviseMonnaie: DeviseMonaie, ressourceExterieure: RessourceExterieure, montantRessourceProgrammer: number,
     montantRessourceEngager: number, montantRessourceOrdonnancer: number, montantRessourceDecaisserFcfa: number,montantConsommeFcfa: number) {
    this.id = id;
    this.libelle = libelle;
    this.annee = annee;
    this.deviseMonnaie = deviseMonnaie;
    this.ressourceExterieure = ressourceExterieure;
    this.montantRessourceProgrammer = montantRessourceProgrammer;
    this.montantRessourceApprouver = montantRessourceEngager;
    this.montantRessourceDecaisser = montantRessourceOrdonnancer;
    this.montantRessourceDecaisserFcfa = montantRessourceDecaisserFcfa;
    this.montantConsommeFcfa = montantConsommeFcfa;
  }
}
