import { Exercice } from './Exercice';
import { Ide } from './Ide';

export class PrevisionRealisationIde {
  id: number;
  montantTheorique: number;
  annee: Exercice;
  montantRealisation: number;
  createBy: string;
  deleteBy: string;


  constructor(id: number,annee: Exercice, montantTheorique: number,  montantRealisation: number,
   createBy: string, deleteBy: string) {

    this.id = id;
    this.montantTheorique = montantTheorique;
    this.annee = annee;
    this.montantRealisation = montantRealisation;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
}
