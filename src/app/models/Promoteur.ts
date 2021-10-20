
export class Promoteur {
  id: number;
  nomcomplet: string;
  tel: string;
  email: string;
  type: string;
  adresse: string;
  anneeCreation: string;

  constructor(id: number, nomcomplet: string, tel: string, email: string, type: string, adresse: string, anneeCreation: string) {
    this.id = id;
    this.nomcomplet = nomcomplet;
    this.tel = tel;
    this.email = email;
    this.type = type;
    this.adresse = adresse;
    this.anneeCreation = anneeCreation;
  }
}
