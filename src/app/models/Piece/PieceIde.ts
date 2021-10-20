import { Ide } from '../Ide';
export class PieceIde {
   id: number;
   fileName: string;
   fullFileName: string;
   fileType: string;
   namePiece: string;
   refPiece: string;
   refEmplacement: string;
   resumePiece: string;
   ide: Ide;
   createdAt: string;

  constructor(id: number, fileName: string, fullFileName: string, fileType: string, namePiece: string, refPiece: string, refEmplacement: string, resumePiece: string, ide: Ide, createdAt: string) {
    this.id = id;
    this.fileName = fileName;
    this.fullFileName = fullFileName;
    this.fileType = fileType;
    this.namePiece = namePiece;
    this.refPiece = refPiece;
    this.refEmplacement = refEmplacement;
    this.resumePiece = resumePiece;
    this.ide = ide;
    this.createdAt = createdAt;
  }
}
