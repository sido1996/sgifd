export class ProrogationProjet {
  id: number;
  motif: string;
  dateDebut: string;
  dateFin: string;
  nbreMois: number;
  createBy: string;
  deleteBy: string;

  constructor(id: number, motif: string, dateDebut: string, dateFin: string, nbreMois: number, createBy: string, deleteBy: string) {
    this.id = id;
    this.motif = motif;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.nbreMois = nbreMois;
    this.createBy = createBy;
    this.deleteBy = deleteBy;
  }
}
