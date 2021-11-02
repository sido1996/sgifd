import {User} from "./User";
import {Role} from "./Role";

export class Rapport {
  estAccessibleAvecRole:	boolean;
  estAccessibleAvecUser:	boolean;
  id: number;
  libelle:	string;
  nom	:string;
  rapportParams:	any;
  roles: Role[];
  status:	boolean;
  users:	User[];
}
