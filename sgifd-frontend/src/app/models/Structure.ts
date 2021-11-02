
import {TypeStructure} from './TypeStructure';
import {DomaineActivite} from './DomaineActivite';

export class Structure {
  id: number;
  denominationStructure: string;
  sigleStructure: string;
  telStructure: string;
  emailStructure: string;
  adresseStructure: string;
  domaineActivites: Array<DomaineActivite>;
  typestructure: TypeStructure;
  createBy:	string;
  deleteBy:	string;

  constructor(
    id: number, denominationStructure: string, 
    sigleStructure: string, telStructure: string, emailStructure: string, 
    adresseStructure: string, domaineActivites: Array<DomaineActivite>, 
    typestructure: TypeStructure, createBy: string, deleteBy: string
    ) {
    this.id = id;
    this.denominationStructure = denominationStructure;
    this.sigleStructure = sigleStructure;
    this.telStructure = telStructure;
    this.emailStructure = emailStructure;
    this.adresseStructure = adresseStructure;
    this.domaineActivites = domaineActivites;
    this.typestructure = typestructure;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
}
