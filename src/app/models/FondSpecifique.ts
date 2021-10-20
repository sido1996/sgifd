import {Exercice} from "./Exercice";
import {Secteur} from "./Secteur";
import {DomainePTF} from "./DomainePTF";
import {Ptf} from "./Ptf";
import {TypeFondSpecifique} from "./TypeFondSpecifique";
import {DeviseMonaie} from './DeviseMonaie';
import {DetailFondSpecifique} from './DetailFondSpecifique';
import {Piece} from './Piece/Piece';
import {GrandSecteur} from "./GrandSecteur";
import {SousSecteur} from "./SousSecteur";

export class FondSpecifique {
  id: number;
  reference: string;
  libelle: string;
  montantDevise: number;
  deviseMonnaie: DeviseMonaie;
  montantFcfa: number; 
  observations: string;
  difficultes: string;
  solutionsEnvisagees: string;
  objectifs: string;
  exercice: Exercice;
  files: Array<Piece>;
  ptfBailleurFrs: Array<Ptf>;
  typeFondSpecifique: TypeFondSpecifique;
  detailFondSpecifiques: Array<DetailFondSpecifique>;
  createBy: string;
  deleteBy: string;
  grandSecteur: GrandSecteur;
  secteur: Secteur;
  sousSecteurs: Array<SousSecteur>;

  constructor(id: number, reference: string, libelle: string, montantDevise: number, deviseMonnaie: DeviseMonaie, montantFcfa: number, observations: string,
    difficultes: string,solutionsEnvisagees: string,
    objectifs: string, exercice: Exercice, files: Array<Piece>, ptfBailleurFrs: Array<Ptf>, typeFondSpecifique: TypeFondSpecifique, detailFondSpecifiques: Array<DetailFondSpecifique>, createBy: string, deleteBy: string, grandSecteur: GrandSecteur, secteur: Secteur, sousSecteurs: Array<SousSecteur>) {
    this.id = id;
    this.reference = reference;
    this.libelle = libelle;
    this.montantDevise = montantDevise;
    this.deviseMonnaie = deviseMonnaie;
    this.montantFcfa = montantFcfa;
    this.observations = observations;
    this.difficultes = difficultes;
    this.solutionsEnvisagees = solutionsEnvisagees;
    this.objectifs = objectifs;
    this.exercice = exercice;
    this.files = files;
    this.ptfBailleurFrs = ptfBailleurFrs;
    this.typeFondSpecifique = typeFondSpecifique;
    this.detailFondSpecifiques = detailFondSpecifiques;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.grandSecteur = grandSecteur;
    this.secteur = secteur;
    this.sousSecteurs = sousSecteurs;
  }
}
