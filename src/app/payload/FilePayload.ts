export class FilePayload {
   namePiece: string;
   refPiece: string;
   refEmplacement: string;
   resumePiece: string;

  constructor(namePiece: string, refPiece: string, refEmplacement: string, resumePiece: string) {
    this.namePiece = namePiece;
    this.refPiece = refPiece;
    this.refEmplacement = refEmplacement;
    this.resumePiece = resumePiece;
  }
}
