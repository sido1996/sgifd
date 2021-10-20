
import {CategoriePTF} from "./CategoriePTF";
import {Pays} from "./Pays";
import {DomainePTF} from "./DomainePTF";
import {RegroupementClubPtf} from "./RegroupementClubPtf";

export class Ptf {

  id: number;
  denominationptf: string;
  sigleptf: string;
  emailptf: string;
  telptf: string;
  adresseptf: string;
  adresseptfEtrangere: string;
  domaineptfs: Array<DomainePTF>;
  categorieptf: CategoriePTF;
  regroupementclub: RegroupementClubPtf;
  pays: Pays;
  createBy:	string;
  deleteBy:	string;

  constructor(id: number, denominationptf: string, sigleptf: string, emailptf: string, telptf: string, adresseptf: string, domaineptfs: Array<DomainePTF>, categorieptf: CategoriePTF, regroupementclubPtf: RegroupementClubPtf, pays: Pays, createBy: string, deleteBy: string) {
    this.id = id;
    this.denominationptf = denominationptf;
    this.sigleptf = sigleptf;
    this.emailptf = emailptf;
    this.telptf = telptf;
    this.adresseptf = adresseptf;
    this.domaineptfs = domaineptfs;
    this.categorieptf = categorieptf;
    this.regroupementclub = regroupementclubPtf;
    this.pays = pays;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
}
