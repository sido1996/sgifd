import { Departement } from './Departement';
import { Commune } from './Commune';
import { Sexe } from './Sexe';
import { FiliereBourse } from './FiliereBourse';
import { CycleBourse } from './CycleBourse';
import { ClefBourse } from './ClefBourse';

export class Bourse {
  id: number;
  filiereBourseEtude: FiliereBourse;
  cycleBourseEtude: CycleBourse;
  sexe: Sexe;
  departement: Departement;
  commune: Commune;
  nombre: ClefBourse;
  createBy: string;
  deleteBy: string;

  constructor(id: number, filiereBourseEtude: FiliereBourse, cycleBourseEtude: CycleBourse, sexe: Sexe, departement: Departement, commune: Commune, nombre: ClefBourse, createBy: string, deleteBy: string) {
    this.id = id;
    this.filiereBourseEtude = filiereBourseEtude;
    this.cycleBourseEtude = cycleBourseEtude;
    this.sexe = sexe;
    this.departement = departement;
    this.commune = commune;
    this.nombre = nombre;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
}
