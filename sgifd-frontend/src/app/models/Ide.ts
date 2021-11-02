import { Exercice } from './Exercice';
import { Promoteur } from './Promoteur';
import { ZoneLocalite } from './ZoneLocalite';
import { Secteur } from './Secteur';
import { Pays } from './Pays';
import { TypeCooperation } from './TypeCooperation';
import { PrevisionRealisationIde } from './PrevisionRealisationIde';
import { PieceIde } from './Piece/PieceIde';
import {DeviseMonaie} from "./DeviseMonaie";

export class Ide {
  id: number;
  libelle: string;
  montantTheorique: number;
  observation: string;
  anneeReception: Exercice;
  typeCooperation: TypeCooperation;
  zone: Array<ZoneLocalite>;
  secteur: Array<Secteur>;
  promoteurs: Array<Promoteur>;
  previsionRealisationIdes: Array<PrevisionRealisationIde>;
  createBy: string;
  deleteBy: string;
  files: Array<PieceIde>;
  montantDevise: number;
  deviseMonnaie: DeviseMonaie;

  constructor(id: number, libelle: string, montantTheorique: number, observation: string, anneeReception: Exercice, typeCooperation: TypeCooperation, zone: Array<ZoneLocalite>, secteur: Array<Secteur>, promoteurs: Array<Promoteur>, previsionRealisationIdes: Array<PrevisionRealisationIde>, createBy: string, deleteBy: string, files: Array<PieceIde>, montantDevise: number, deviseMonnaie: DeviseMonaie) {
    this.id = id;
    this.libelle = libelle;
    this.montantTheorique = montantTheorique;
    this.observation = observation;
    this.anneeReception = anneeReception;
    this.typeCooperation = typeCooperation;
    this.zone = zone;
    this.secteur = secteur;
    this.promoteurs = promoteurs;
    this.previsionRealisationIdes = previsionRealisationIdes;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.files = files;
    this.montantDevise = montantDevise;
    this.deviseMonnaie = deviseMonnaie;
  }
}
