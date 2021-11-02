import {GrandSecteur} from "./GrandSecteur";

export class Secteur {
  id: number;
  libelle:	string;
  createBy:	string;
  deleteBy:	string;
  grandSecteur: GrandSecteur;

  constructor(id: number, libelle: string, createBy: string, deleteBy: string, grandSecteur: GrandSecteur) {
    this.id = id;
    this.libelle = libelle;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.grandSecteur = grandSecteur;
  }
}
