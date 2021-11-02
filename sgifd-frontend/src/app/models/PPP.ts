import {Exercice} from "./Exercice";
import {TypeCooperation} from './TypeCooperation';
import {Promoteur} from './Promoteur';
import {PrevisionRealisationPPP} from './PrevisionRealisationPPP';
import {ProjetProgramme} from './ProjetProgramme';
import { Piece } from './Piece/Piece';
import {DeviseMonaie} from "./DeviseMonaie";

export class PPP {
  id: number;
  categorie: string;
  anneePartenariat: Exercice;
  projetProgrammeIdee: ProjetProgramme;
  libelle: string;
  observations: string;
  typeCooperation: TypeCooperation;
  montantTheorique: number;
  files: Array<Piece>;
  promoteurs: Array<Promoteur>;
  previsionRealisationPPPs: Array<PrevisionRealisationPPP>;
  createBy: string;
  deleteBy: string;
  montantDevise: number;
  deviseMonnaie: DeviseMonaie;

  constructor(id: number, categorie: string, anneePartenariat: Exercice, projetProgrammeIdee: ProjetProgramme, libelle: string, observations: string, typeCooperation: TypeCooperation, montantTheorique: number, files: Array<Piece>, promoteurs: Array<Promoteur>, previsionRealisationPPPs: Array<PrevisionRealisationPPP>, createBy: string, deleteBy: string, montantDevise: number, deviseMonnaie: DeviseMonaie) {
    this.id = id;
    this.categorie = categorie;
    this.anneePartenariat = anneePartenariat;
    this.projetProgrammeIdee = projetProgrammeIdee;
    this.libelle = libelle;
    this.observations = observations;
    this.typeCooperation = typeCooperation;
    this.montantTheorique = montantTheorique;
    this.files = files;
    this.promoteurs = promoteurs;
    this.previsionRealisationPPPs = previsionRealisationPPPs;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.montantDevise = montantDevise;
    this.deviseMonnaie = deviseMonnaie;
  }
}
