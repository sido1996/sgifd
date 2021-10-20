

import { ConditionSuspensiveAccord } from './ConditionSuspensiveAccord';
import { ConditionSuspensiveUnDecaissement } from './ConditionSuspensiveUnDecaissement';
import { Envergure } from './Envergure';
import { NatureFinancement } from './NatureFinancement';
import { ObjectifODD } from './ObjectifODD';
import { Ptf } from './Ptf';
import { PilierPAG } from './PilierPAG';
import { ProjetIdee } from './ProjetIdee';
import { SousSecteur } from './SousSecteur';
import { Structure } from './Structure';
import { TypeAccord } from './TypeAccord';
import { Exercice } from './Exercice';
import { NatureAssistance } from './NatureAssistance';
import { PieceAccord } from './Piece/PieceAccord';
import { DeviseMonaie } from "./DeviseMonaie";
import { ProjetProgrammeIdee } from "./ProjetProgrammeIdee";
import { StatusAccord } from './StatusAccord';

export class Accord {

  annee: Exercice;
  natureAssistance: NatureAssistance;
  conditionSuspensiveUnDecaissements: Array<ConditionSuspensiveUnDecaissement>;
  createBy: string;
  dateSignature: string;
  deleteBy: string;
  envergure: Envergure;
  id: number;
  intitule: string;
  natureFinancement: NatureFinancement;
  odds: Array<ObjectifODD>;
  ptfBailleurFrs: Array<Ptf>;
  pilierPAGs: Array<PilierPAG>;
  projetProgrammeIdees: Array<ProjetProgrammeIdee>;
  reference: string;
  sousSecteurs: Array<SousSecteur>;
  structureBeneficiaire: Structure;
  typeAccord: TypeAccord;
  montant: number;
  categorie: string;
  files: Array<PieceAccord>;
  montantDevise: number;
  deviseMonnaie: DeviseMonaie;

  dateRatification: string;
  dateFinAccord: string;
  dateDeMiseEnVigueurPtf: string;
  contrePartieNationale: number;
  apportPtf: number;
  nomDuSignataire: string;
  dureeAccord: number;
  apportPtfDevise: number;
  lieuDuSignature: string;
  depositaire: string;
  retombees: string;
  avenants: string;
  statusAccord: StatusAccord;

  constructor(
    annee: Exercice, natureAssistance: NatureAssistance, conditionSuspensiveUnDecaissements: Array<ConditionSuspensiveUnDecaissement>,
    createBy: string, dateSignature: string, deleteBy: string, envergure: Envergure, id: number, intitule: string,
    natureFinancement: NatureFinancement, odds: Array<ObjectifODD>, ptfBailleurFrs: Array<Ptf>, pilierPAGs: Array<PilierPAG>,
    projetProgrammeIdees: Array<ProjetProgrammeIdee>, reference: string, sousSecteurs: Array<SousSecteur>, structureBeneficiaire: Structure,
    typeAccord: TypeAccord, montant: number, categorie: string, files: Array<PieceAccord>, montantDevise: number, deviseMonnaie: DeviseMonaie,
    dateRatification: string, dateFinAccord: string, dateDeMiseEnVigueurPtf: string, contrePartieNationale: number, apportPtf: number, 
    nomDuSignataire: string, dureeAccord: number, apportPtfDevise: number, lieuDuSignature: string, depositaire: string, 
    retombees: string, avenants: string, statusAccord: StatusAccord) {
    this.annee = annee;
    this.natureAssistance = natureAssistance;
    this.conditionSuspensiveUnDecaissements = conditionSuspensiveUnDecaissements;
    this.createBy = createBy;
    this.dateSignature = dateSignature;
    this.deleteBy = deleteBy;
    this.envergure = envergure;
    this.id = id;
    this.intitule = intitule;
    this.natureFinancement = natureFinancement;
    this.odds = odds;
    this.ptfBailleurFrs = ptfBailleurFrs;
    this.pilierPAGs = pilierPAGs;
    this.projetProgrammeIdees = projetProgrammeIdees;
    this.reference = reference;
    this.sousSecteurs = sousSecteurs;
    this.structureBeneficiaire = structureBeneficiaire;
    this.typeAccord = typeAccord;
    this.montant = montant;
    this.categorie = categorie;
    this.files = files;
    this.montantDevise = montantDevise;
    this.deviseMonnaie = deviseMonnaie;
    this.dateRatification = dateRatification;
    this.dateFinAccord = dateFinAccord;
    this.dateDeMiseEnVigueurPtf = dateDeMiseEnVigueurPtf;
    this.contrePartieNationale = contrePartieNationale;
    this.apportPtf = apportPtf;
    this.nomDuSignataire = nomDuSignataire;
    this.dureeAccord = dureeAccord;
    this.apportPtfDevise = apportPtfDevise;
    this.lieuDuSignature = lieuDuSignature;
    this.depositaire = depositaire;
    this.retombees = retombees;
    this.avenants = avenants;
    this.statusAccord = statusAccord;
    
  }
}
