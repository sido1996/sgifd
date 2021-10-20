import { AxePrioritaire } from './AxePrioritaire';
import { ObjectifODD } from './ObjectifODD';
import { DomainePTF } from "./DomainePTF";
import { Ptf } from "./Ptf";
import { ProjetIdee } from "./ProjetIdee";
import { SousSecteur } from './SousSecteur';
import { DeviseMonaie } from './DeviseMonaie';
import { PieceCommisionMixteDSP } from './Piece/PieceCommisionMixteDSP';
import { AxePrioritaireCommission } from './AxePrioritaireCommission';
import { ProjetProgrammeIdee } from './ProjetProgrammeIdee';

export class CommissionMixteDsp {
  id: number;
  institutionsPtf: Ptf;
  dateApprobation: Date;
  dateOrAnneeDebutPeriode: string;
  dateOrAnneeFinPeriode: string;
  periodicite: string;
  lieuDerniereCommission: string;
  libelle: string;
  domaines: Array<DomainePTF>;
  sousSecteurs: Array<SousSecteur>;
  odd: Array<ObjectifODD>;
  montantPrevisionnelDevise: number;
  deviseMonnaie: DeviseMonaie;
  montantPrevisionnelFcfa: number;
  obligations: string;
  recommandation: string;
  axePrioritaireCommissions: Array<AxePrioritaireCommission>;
  projetProgrammeIdees: Array<ProjetIdee>;
  createBy: string;
  deleteBy: string;
  files: Array<PieceCommisionMixteDSP>;


  constructor(
    id: number,
    institutionsPtf: Ptf,
    dateApprobation: Date,
    dateOrAnneeDebutPeriode: string,
    dateOrAnneeFinPeriode: string,
    periodicite: string,
    lieuDerniereCommission: string,
    libelle: string,
    domaines: Array<DomainePTF>,
    sousSecteurs: Array<SousSecteur>,
    odd: Array<ObjectifODD>,
    montantPrevisionnelDevise: number,
    deviseMonnaie: DeviseMonaie,
    montantPrevisionnelFcfa: number,
    obligations: string,
    recommandation: string,
    axePrioritaireCommissions: Array<AxePrioritaireCommission>,
    projetProgrammeIdees: Array<ProjetIdee>,
    createBy: string,
    deleteBy: string,

  ) {
    this.id = id;
    this.institutionsPtf = institutionsPtf;
    this.dateApprobation = dateApprobation;
    this.dateOrAnneeDebutPeriode = dateOrAnneeDebutPeriode;
    this.dateOrAnneeFinPeriode = dateOrAnneeFinPeriode;
    this.periodicite = periodicite;
    this.lieuDerniereCommission = lieuDerniereCommission;
    this.libelle = libelle;
    this.domaines = domaines;
    this.sousSecteurs = sousSecteurs;
    this.odd = odd;
    this.montantPrevisionnelDevise = montantPrevisionnelDevise;
    this.deviseMonnaie = deviseMonnaie;
    this.montantPrevisionnelFcfa = montantPrevisionnelFcfa;
    this.obligations = obligations;
    this.recommandation = recommandation;
    this.axePrioritaireCommissions = axePrioritaireCommissions;
    this.projetProgrammeIdees = projetProgrammeIdees;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    
  }
}
