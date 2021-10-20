import {FonctionnaliteUser} from "./FonctionnaliteUser";
import {ActionOfFonctionnalite} from "./ActionOfFonctionnalite";

export class AccreditatedUser {
  id: number;
  fonctionnaliteUser: FonctionnaliteUser;
  actionOfFonctionnalites: Array<ActionOfFonctionnalite>;

  constructor(id: number, fonctionnaliteUser: FonctionnaliteUser, actionOfFonctionnalites: Array<ActionOfFonctionnalite>) {
    this.id = id;
    this.fonctionnaliteUser = fonctionnaliteUser;
    this.actionOfFonctionnalites = actionOfFonctionnalites;
  }
}
