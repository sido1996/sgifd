import { AideCapitale } from '../AideCapitale';


export class PieceAideCapitale {

   id: number;
   fileName: string;
   fullFileName: string;
   fileType: string;
   namePiece: string;
   refPiece: string;
   refEmplacement: string;
   resumePiece: string;
   aideCapitale: AideCapitale;
   createdAt: string;

  constructor(id: number, fileName: string, fullFileName: string, fileType: string, namePiece: string, refPiece: string, refEmplacement: string, resumePiece: string, aideCapitale: AideCapitale, createdAt: string) {
    this.id = id;
    this.fileName = fileName;
    this.fullFileName = fullFileName;
    this.fileType = fileType;
    this.namePiece = namePiece;
    this.refPiece = refPiece;
    this.refEmplacement = refEmplacement;
    this.resumePiece = resumePiece;
    this.aideCapitale = aideCapitale;
    this.createdAt = createdAt;
  }
}
