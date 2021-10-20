export class CloseProjet {
  id: number;
  reasonClose: string;
  dateClose: string;

  constructor(id: number, reasonClose: string, dateClose: string) {
    this.id = id;
    this.reasonClose = reasonClose;
    this.dateClose = dateClose;
  }
}
