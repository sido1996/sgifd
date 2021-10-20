import { Bourse } from './Bourse';
import { NatureAssistance } from './NatureAssistance';
import { Pays } from './Pays';
import { Exercice } from './Exercice';
import { Informateur } from './Informateur';
import { Ptf } from "./Ptf";
import { PieceAideCapitale } from './Piece/PieceAideCapitale';
import { Piece } from './Piece/Piece';
import { DeviseMonaie } from "./DeviseMonaie";

export class AideCapitale {
  id: number;
  exercice: Exercice;
  ptfBailleurFrs: Ptf;
  natureAssistance: NatureAssistance;
  montant: number;
  octroyers: Array<Bourse>;
  informateur: Informateur;
  observations: string;
  files: Array<Piece>;
  createBy: string;
  deleteBy: string;
  montantDevise: number;
  deviseMonnaie: DeviseMonaie;

  constructor(
    id: number, exercice: Exercice,
    ptfBailleurFrs: Ptf, natureAssistance: NatureAssistance,
    montant: number, octroyers: Array<Bourse>, informateur: Informateur,
    observations: string, files: Array<Piece>, createBy: string, deleteBy: string,
    montantDevise: number, deviseMonnaie: DeviseMonaie
  ) {
    this.id = id;
    this.exercice = exercice;
    this.ptfBailleurFrs = ptfBailleurFrs;
    this.natureAssistance = natureAssistance;
    this.montant = montant;
    this.octroyers = octroyers;
    this.informateur = informateur;
    this.observations = observations;
    this.files = files;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.montantDevise = montantDevise;
    this.deviseMonnaie = deviseMonnaie;
  }
}
