import {NatureAideAlimentaire} from "./nature-aide-alimentaire";

export class NatureAideAlimentaireDetail {
  id: number;
  quantite:	number;
  montantDevise:	number;
  montant:	number;
  natureAideAlimentaire: NatureAideAlimentaire;
  createBy:	string;
  deleteBy:	string;
  caracteristique: string;
}
