import {Ptf} from "./Ptf";
import {DeviseMonaie} from "./DeviseMonaie";
import {NatureAssistance} from "./NatureAssistance";
import {TypeAssistance} from "./TypeAssistance";
import {NatureFinancement} from "./NatureFinancement";
import {RessourceExterieureAnnuelle} from "./RessourceExterieureAnnuelle";
import {RelanceRequeteFinancement} from "./RelanceRequeteFinancement";
import {ReponseRequeteFinancement} from "./ReponseRequeteFinancement";

export class RessourceExterieure {
  id: number;
  libelle: string;
  ptfBailleurFrs: Ptf;
  montantRessourceProgrammer: number;
  montantRessourceDevise: number;
  deviseMonnaie: DeviseMonaie;
  natureAssistance: NatureAssistance;
  typeAssistance: TypeAssistance;
  natureFinancement: NatureFinancement;
  ressourceExterieureAnnuelles: Array<RessourceExterieureAnnuelle>;
  isStatusClose: boolean;
  createdAt: string;
  dateCloture : string;
  relanceRequeteFinancements: Array<RelanceRequeteFinancement>;
  reponseRequeteFinancements: Array<ReponseRequeteFinancement>;

  constructor(id: number, libelle: string, ptfBailleurFrs: Ptf, montantRessourceProgrammer: number, montantRessourceDevise: number, deviseMonnaie: DeviseMonaie, natureAssistance: NatureAssistance, typeAssistance: TypeAssistance, natureFinancement: NatureFinancement, ressourceExterieureAnnuelles: Array<RessourceExterieureAnnuelle>,isStatusClose: boolean) {
    this.id = id;
    this.libelle = libelle;
    this.ptfBailleurFrs = ptfBailleurFrs;
    this.montantRessourceProgrammer = montantRessourceProgrammer;
    this.montantRessourceDevise = montantRessourceDevise;
    this.deviseMonnaie = deviseMonnaie;
    this.natureAssistance = natureAssistance;
    this.typeAssistance = typeAssistance;
    this.natureFinancement = natureFinancement;
    this.ressourceExterieureAnnuelles = ressourceExterieureAnnuelles;
    this.isStatusClose = isStatusClose;

  }
}
