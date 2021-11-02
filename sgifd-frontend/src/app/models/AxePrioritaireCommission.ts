import { DeviseMonaie } from './DeviseMonaie';
export class AxePrioritaireCommission {

id: number;
libelle: string;
montantPrevisionnelDevise: number;
deviseMonnaie: DeviseMonaie;
montantPrevisionnelFcfa: number;
createBy: string;
deleteBy: string;

constructor(id: number, libelle: string, montantPrevisionnelDevise: number, deviseMonnaie: DeviseMonaie,
    montantPrevisionnelFcfa: number, createBy: string, deleteBy: string) {
    this.id = id;
    this.libelle = libelle;
    this.montantPrevisionnelDevise = montantPrevisionnelDevise;
    this.deviseMonnaie = deviseMonnaie;
    this.montantPrevisionnelFcfa = montantPrevisionnelFcfa;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
  }