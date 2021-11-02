import {Exercice} from "./Exercice";
import {AxePrioritaire} from "./AxePrioritaire";
import {CategorieProjet} from "./CategorieProjet";
import {Cible} from "./Cible";
import {ConditionSuspensiveAccord} from "./ConditionSuspensiveAccord";
import {Envergure} from "./Envergure";
import {GrandSecteur} from "./GrandSecteur";
import {Localisation} from "./Localisation";
import {NiveauMaturite} from "./NiveauMaturite";
import {RessourceExterieure} from "./RessourceExterieure";
import {Structure} from "./Structure";
import {TypeRessourceInterieure} from "./TypeRessourceInterieure";
import {TypeCooperation} from "./TypeCooperation";
import {SousSecteur} from "./SousSecteur";
import {Secteur} from "./Secteur";
import {RessourceInterieureAnnuelle} from "./RessourceInterieureAnnuelle";
import {ConditionSuspensiveDecaissement} from "./ConditionSuspensiveDecaissement";
import {PieceIde} from "./Piece/PieceIde";
import {Piece} from "./Piece/Piece";
import {ProrogationProjet} from "./ProrogationProjet";
import { SecteurImpacte } from './SecteurImpacte';

export class ProjetProgramme {
  annee: Exercice;
  axePrioritaires: Array<AxePrioritaire>;
  categorieProjet: CategorieProjet;
  cibles: Array<Cible>;
  conditionSuspensiveAccords: Array<ConditionSuspensiveAccord>;
  contrePartieNationale: number;
  coutGlobalProjet: number;
  coutTotalRessourcesExterieures: number;
  createBy: string;
  createdAt: string;
  dateAchevementPrevue: string;
  dateApprobation: string;
  dateDemarrage: string;
  dateMiseEnVigueur: string;
  dateRactification: string;
  dateSignatureAccord: string;
  deleteBy: string;
  difficultes: string;
  dureeAnnees: Array<Exercice>;
  dureeProjet: number;
  envergure: Envergure;
  grandSecteur: GrandSecteur;
  id: number;
  libelle: string;
  localisations: Array<Localisation>;
  nbreProrogation: number;
  niveaumaturite: NiveauMaturite;
  objectifgeneral: string;
  objectifs: string;
  reference: string;
  ressourceExterieures: Array<RessourceExterieure>;
  ressourceInterieureAnnuelles: Array<RessourceInterieureAnnuelle>;
  secteur: Secteur;
  sousSecteur: SousSecteur;
  structureAgenceExecution: Array<Structure>;
  structureSousTutelle: Structure;
  type: string;
  typeCooperations: Array<TypeCooperation>;
  typeRessourceInterieures: Array<TypeRessourceInterieure>;
  isClose: boolean;
  valide: boolean;
  conditionSuspensiveDecaissements:Array<ConditionSuspensiveDecaissement>;
  files: Array<Piece>;
  prorogationProjets: Array<ProrogationProjet>;
  solutionEnvisagee: string;
  realisationAudit: string;
  secteurImpactes: Array<SecteurImpacte>;

  constructor(annee: Exercice, axePrioritaires: Array<AxePrioritaire>,
    categorieProjet: CategorieProjet, cibles: Array<Cible>,
    conditionSuspensiveAccords: Array<ConditionSuspensiveAccord>, contrePartieNationale: number,
    coutGlobalProjet: number, coutTotalRessourcesExterieures: number,
    createBy: string, createdAt: string, dateAchevementPrevue: string, dateApprobation: string,
    dateDemarrage: string, dateMiseEnVigueur: string, dateRactification: string,
    dateSignatureAccord: string, deleteBy: string, difficultes: string,
    dureeAnnees: Array<Exercice>, dureeProjet: number, envergure: Envergure,
    grandSecteur: GrandSecteur, id: number, libelle: string, localisations: Array<Localisation>,
    nbreProrogation: number, niveaumaturite: NiveauMaturite, objectifgeneral: string,
    objectifs: string, reference: string, ressourceExterieures: Array<RessourceExterieure>,
    ressourceInterieureAnnuelles: Array<RessourceInterieureAnnuelle>, secteur: Secteur,
    sousSecteur: SousSecteur, structureAgenceExecution: Array<Structure>,
    structureSousTutelle: Structure, type: string,
    typeCooperations: Array<TypeCooperation>, typeRessourceInterieures: Array<TypeRessourceInterieure>, isClose: boolean, valide: boolean, conditionSuspensiveDecaissements: Array<ConditionSuspensiveDecaissement>, files: Array<Piece>, prorogationProjets: Array<ProrogationProjet>, solutionEnvisagee: string, realisationAudit: string) {
    this.annee = annee;
    this.axePrioritaires = axePrioritaires;
    this.categorieProjet = categorieProjet;
    this.cibles = cibles;
    this.conditionSuspensiveAccords = conditionSuspensiveAccords;
    this.contrePartieNationale = contrePartieNationale;
    this.coutGlobalProjet = coutGlobalProjet;
    this.coutTotalRessourcesExterieures = coutTotalRessourcesExterieures;
    this.createBy = createBy;
    this.createdAt = createdAt;
    this.dateAchevementPrevue = dateAchevementPrevue;
    this.dateApprobation = dateApprobation;
    this.dateDemarrage = dateDemarrage;
    this.dateMiseEnVigueur = dateMiseEnVigueur;
    this.dateRactification = dateRactification;
    this.dateSignatureAccord = dateSignatureAccord;
    this.deleteBy = deleteBy;
    this.difficultes = difficultes;
    this.dureeAnnees = dureeAnnees;
    this.dureeProjet = dureeProjet;
    this.envergure = envergure;
    this.grandSecteur = grandSecteur;
    this.id = id;
    this.libelle = libelle;
    this.localisations = localisations;
    this.nbreProrogation = nbreProrogation;
    this.niveaumaturite = niveaumaturite;
    this.objectifgeneral = objectifgeneral;
    this.objectifs = objectifs;
    this.reference = reference;
    this.ressourceExterieures = ressourceExterieures;
    this.ressourceInterieureAnnuelles = ressourceInterieureAnnuelles;
    this.secteur = secteur;
    this.sousSecteur = sousSecteur;
    this.structureAgenceExecution = structureAgenceExecution;
    this.structureSousTutelle = structureSousTutelle;
    this.type = type;
    this.typeCooperations = typeCooperations;
    this.typeRessourceInterieures = typeRessourceInterieures;
    this.isClose = isClose;
    this.valide = valide;
    this.conditionSuspensiveDecaissements = conditionSuspensiveDecaissements;
    this.files = files;
    this.prorogationProjets = prorogationProjets;
    this.solutionEnvisagee = solutionEnvisagee;
    this.realisationAudit = realisationAudit;
  }
}
