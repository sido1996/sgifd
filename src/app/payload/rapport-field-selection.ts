import {Arrondissement} from "../models/Arrondissement";
import {AxePrioritaire} from "../models/AxePrioritaire";
import {CategoriePTF} from "../models/CategoriePTF";
import {Cible} from "../models/Cible";
import {Commune} from "../models/Commune";
import {Departement} from "../models/Departement";
import {DomainePTF} from "../models/DomainePTF";
import {Envergure} from "../models/Envergure";
import {Exercice} from "../models/Exercice";
import {GrandSecteur} from "../models/GrandSecteur";
import {NatureAssistance} from "../models/NatureAssistance";
import {NatureFinancement} from "../models/NatureFinancement";
import {NiveauMaturite} from "../models/NiveauMaturite";
import {ObjectifODD} from "../models/ObjectifODD";
import {Ptf} from "../models/Ptf";
import {Pays} from "../models/Pays";
import {PilierPAG} from "../models/PilierPAG";
import {Secteur} from "../models/Secteur";
import {SousSecteur} from "../models/SousSecteur";
import {Structure} from "../models/Structure";
import {TypeAccord} from "../models/TypeAccord";
import {TypeCooperation} from "../models/TypeCooperation";
import {TypeFondSpecifique} from "../models/TypeFondSpecifique";
import {TypeRessourceInterieure} from "../models/TypeRessourceInterieure";

export class RapportFieldSelection {

  arrondissementList: Arrondissement[];
  axePrioritaireList: AxePrioritaire[];
  categoriePTFList: CategoriePTF[];
  cibleList: Cible[];
  communeList: Commune[];
  departementList: Departement[];
  domainePTFList: DomainePTF[];
  envergureList: Envergure[];
  exerciceList: Exercice[];
  grandSecteurList: GrandSecteur[];
  natureAssistanceList: NatureAssistance[];
  natureFinancementList	: NatureFinancement[];
  niveauMaturiteList: NiveauMaturite[];
  oDDList: ObjectifODD[];
  pTFBailleurFrsList: Ptf[];
  paysList: Pays[];
  pilierPAGList: PilierPAG[];
  secteurList: Secteur[];
  sousSecteurList: SousSecteur[];
  structureBeneficiaireList: Structure[];
  typeAccordList: TypeAccord[];
  typeCooperationList: TypeCooperation[];
  typeFondSpecifiqueList: TypeFondSpecifique[];
  typeRessourceInterieureList: TypeRessourceInterieure[];


}
