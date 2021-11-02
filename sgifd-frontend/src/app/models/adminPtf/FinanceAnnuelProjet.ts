import { DeviseMonaie } from '../DeviseMonaie';
import { NatureAssistance } from '../NatureAssistance';
import { NatureFinancement } from '../NatureFinancement';

export class FinanceAnnuelProjet {
  montantRessourceProgrammer: number;
  montantRessourceDecaisser: number;
  deviseMonnaie: DeviseMonaie;
  natureFinancement: NatureFinancement;
  reference:	string;
  libelle:	string;
  id: number;
}
