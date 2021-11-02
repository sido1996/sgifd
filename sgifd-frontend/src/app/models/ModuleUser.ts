import {FonctionnaliteUser} from "./FonctionnaliteUser";

export class ModuleUser {
  id: number;
  name: string;
  libelle: string;
  fonctionnaliteUsers: Array<FonctionnaliteUser>;

  constructor(id: number, name: string, libelle: string, fonctionnaliteUsers: Array<FonctionnaliteUser>) {
    this.id = id;
    this.name = name;
    this.libelle = libelle;
    this.fonctionnaliteUsers = fonctionnaliteUsers;
  }
}
