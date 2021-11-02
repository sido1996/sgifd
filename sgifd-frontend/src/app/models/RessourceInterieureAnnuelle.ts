import {ProjetProgramme} from "./ProjetProgramme";
import {Exercice} from "./Exercice";
import { TypeRessourceInterieure } from './TypeRessourceInterieure';

export class RessourceInterieureAnnuelle {
  id;
  libelle;
  annee: Exercice;
  projetProgrammeIdee: ProjetProgramme;
  typeRessourceInterieure: TypeRessourceInterieure;
  montantRessourceProgrammer: number;
  montantRessourceEngager: number;
  montantRessourceOrdonnancer: number;

  constructor(id, libelle, annee: Exercice, typeRessourceInterieure: TypeRessourceInterieure, projetProgrammeIdee: ProjetProgramme, montantRessourceProgrammer: number, montantRessourceEngager: number, montantRessourceOrdonnancer: number) {
    this.id = id;
    this.libelle = libelle;
    this.annee = annee;
    this.typeRessourceInterieure = typeRessourceInterieure;
    this.projetProgrammeIdee = projetProgrammeIdee;
    this.montantRessourceProgrammer = montantRessourceProgrammer;
    this.montantRessourceEngager = montantRessourceEngager;
    this.montantRessourceOrdonnancer = montantRessourceOrdonnancer;
  }
}
