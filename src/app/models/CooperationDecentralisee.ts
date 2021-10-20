import {Exercice} from "./Exercice";
import {Informateur} from "./Informateur";
import {Ptf} from "./Ptf";
import {Structure} from "./Structure";
import {ProjetIdee} from "./ProjetIdee";
import {TypeCooperation} from "./TypeCooperation";
import { Piece } from './Piece/Piece';
import {DeviseMonaie} from "./DeviseMonaie";

export class CooperationDecentralisee {

  id: number;
  reference: string;
  libelle: string;
  montant: number;
  observation: string;
  resultats: string;
  defis: string;
  difficultes: string;
  exercice: Exercice;
  informateur: Informateur;
  files: Array<Piece>;
  ptfBailleurFrs: Array<Ptf>;
  structureBeneficiaire: Structure;
  projetsElus: Array<ProjetIdee>;
  projetsSoumis: Array <ProjetIdee>;
  createBy:	string;
  deleteBy:	string;
  typeCooperation: TypeCooperation;
  montantDevise: number;
  deviseMonnaie: DeviseMonaie;

  constructor(id: number, reference: string, libelle: string, montant: number, observation: string, resultats: string, defis: string, difficultes: string, exercice: Exercice, informateur: Informateur, files: Array<Piece>, ptfBailleurFrs: Array<Ptf>, structureBeneficiaire: Structure, projetsElus: Array<ProjetIdee>, projetsSoumis: Array<ProjetIdee>, createBy: string, deleteBy: string, typeCooperation: TypeCooperation, montantDevise: number, deviseMonnaie: DeviseMonaie) {
    this.id = id;
    this.reference = reference;
    this.libelle = libelle;
    this.montant = montant;
    this.observation = observation;
    this.resultats = resultats;
    this.defis = defis;
    this.difficultes = difficultes;
    this.exercice = exercice;
    this.informateur = informateur;
    this.files = files;
    this.ptfBailleurFrs = ptfBailleurFrs;
    this.structureBeneficiaire = structureBeneficiaire;
    this.projetsElus = projetsElus;
    this.projetsSoumis = projetsSoumis;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.typeCooperation = typeCooperation;
    this.montantDevise = montantDevise;
    this.deviseMonnaie = deviseMonnaie;
  }
}
