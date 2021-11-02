import { NatureFinancement } from './NatureFinancement';
import { Ptf } from './Ptf';
import { Structure } from './Structure';
import { Exercice } from './Exercice';
import { NatureAssistance } from './NatureAssistance';
import { DeviseMonaie } from './DeviseMonaie';
import { TypeAppuiBudgetaire } from './TypeAppuiBudgetaire';
import { PieceAppuiBudgetaire } from './Piece/PieceAppuiBudgetaire';

export class AppuiBudgetaire {
  id: number;
  annee: Exercice;
  typeAppuiBudgetaire: TypeAppuiBudgetaire;
  natureAssistance: NatureAssistance;
  natureFinancement: NatureFinancement;
  ptfBailleurFrs: Ptf;
  montantDevise: number;
  deviseMonnaie: DeviseMonaie;
  montant: number;
  observation: string;
  structureBeneficiaire: Structure;
  files: Array<PieceAppuiBudgetaire>;
  createBy: string;
  deleteBy: string;

  constructor(
    id: number, 
    annee: Exercice,
    typeAppuiBudgetaire: TypeAppuiBudgetaire,
    natureAssistance: NatureAssistance,
    natureFinancement: NatureFinancement,
    ptfBailleurFrs: Ptf,
    montantDevise: number,
    deviseMonnaie: DeviseMonaie,
    montant: number,
    observation: string,
    structureBeneficiaire: Structure,
    files: Array<PieceAppuiBudgetaire>,
    createBy: string,
    deleteBy: string,
  ) {
    this.id = id;
    this.annee = annee;
    this.typeAppuiBudgetaire = typeAppuiBudgetaire;
    this.natureAssistance = natureAssistance;
    this.natureFinancement = natureFinancement;
    this.ptfBailleurFrs = ptfBailleurFrs;
    this.montantDevise = montantDevise;
    this.deviseMonnaie = deviseMonnaie;
    this.montant = montant;
    this.observation = observation;
    this.structureBeneficiaire = structureBeneficiaire;
    this.files = files;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
}
