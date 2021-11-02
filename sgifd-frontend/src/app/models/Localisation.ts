import {Departement} from "./Departement";
import {Commune} from "./Commune";
import {Arrondissement} from "./Arrondissement";
import { ZoneLocalite } from './ZoneLocalite';

export class Localisation {
  id: number;
  //libelle:	string;
  zoneLocalite: ZoneLocalite;
  createBy:	string;
  deleteBy:	string;
  departement: Departement;
  commune: Commune;
  arrondissement: Arrondissement;

  constructor(id: number, zoneLocalite: ZoneLocalite, createBy: string, deleteBy: string, departement: Departement, commune: Commune, arrondissement: Arrondissement) {
    this.id = id;
    this.zoneLocalite = zoneLocalite;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.departement = departement;
    this.commune = commune;
    this.arrondissement = arrondissement;
  }
}
