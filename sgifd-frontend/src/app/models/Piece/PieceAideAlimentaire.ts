import { AideAlimentaire } from '../AideAlimentaire';


export class PieceAideAlimentaire {

   id: number;
   fileName: string;
   fullFileName: string;
   fileType: string;
   namePiece: string;
   refPiece: string;
   refEmplacement: string;
   resumePiece: string;
   aideAlimentaire: AideAlimentaire;
   createdAt: string;

  constructor(id: number, fileName: string, fullFileName: string, fileType: string, namePiece: string, refPiece: string, refEmplacement: string, resumePiece: string, aideAlimentaire: AideAlimentaire, createdAt: string) {
    this.id = id;
    this.fileName = fileName;
    this.fullFileName = fullFileName;
    this.fileType = fileType;
    this.namePiece = namePiece;
    this.refPiece = refPiece;
    this.refEmplacement = refEmplacement;
    this.resumePiece = resumePiece;
    this.aideAlimentaire = aideAlimentaire;
    this.createdAt = createdAt;
  }
}
