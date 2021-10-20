import { Exercice } from './Exercice';
import { Informateur } from './Informateur';
import { Pays } from './Pays';
import { NatureAssistance } from './NatureAssistance';
import { Ptf } from "./Ptf";
import { PieceAideAlimentaire } from './Piece/PieceAideAlimentaire';
import { Piece } from './Piece/Piece';
import { DeviseMonaie } from "./DeviseMonaie";
import {NatureAideAlimentaireDetail} from "./nature-aide-alimentaire-detail";

export class AideAlimentaire {
  id: number;
  exercice: Exercice;
  ptfBailleurFrs: Ptf;
  natureAssistance: NatureAssistance;
  montant: number;
  informateur: Informateur;
  observations: string;
  files: Array<Piece>;
  createBy: string;
  deleteBy: string;
  montantDevise: number;
  deviseMonnaie: DeviseMonaie;
  natureAideAlimentaireDetails: NatureAideAlimentaireDetail[];

  constructor(
    id: number, exercice: Exercice, ptfBailleurFrs: Ptf,
    natureAssistance: NatureAssistance, montant: number, informateur: Informateur,
    observations: string, files: Array<Piece>, createBy: string, deleteBy: string,
    montantDevise: number, deviseMonnaie: DeviseMonaie, natureAideAlimentaireDetails: NatureAideAlimentaireDetail[]
  ) {
    this.id = id;
    this.exercice = exercice;
    this.ptfBailleurFrs = ptfBailleurFrs;
    this.natureAssistance = natureAssistance;
    this.montant = montant;
    this.informateur = informateur;
    this.observations = observations;
    this.files = files;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.montantDevise = montantDevise;
    this.deviseMonnaie = deviseMonnaie;
    this.natureAideAlimentaireDetails = natureAideAlimentaireDetails;
  }
}
