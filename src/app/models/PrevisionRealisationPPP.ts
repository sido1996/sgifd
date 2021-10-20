import {Commune} from "./Commune";
import { Exercice } from './Exercice';

export class PrevisionRealisationPPP {
  id: number;
  annee:	Exercice;
  montantTheorique: number;
  montantRealisation: number;
  createBy:	string;
  deleteBy:	string;
  

  constructor(id: number, annee:	Exercice,montantTheorique: number,
    montantRealisation: number,  createBy: string, deleteBy: string) {
    this.id = id;
    this.annee = annee;
    this.montantTheorique = montantTheorique;
    this.montantRealisation = montantRealisation;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
}
