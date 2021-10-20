import {RequeteFinancement} from "../RequeteFinancement";


export class PieceRequeteFinancement {

   id: number;
   fileName: string;
   fullFileName: string;
   fileType: string;
   namePiece: string;
   refPiece: string;
   refEmplacement: string;
   resumePiece: string;
   requeteFinancement: RequeteFinancement;
   createdAt: string;

  constructor(id: number, fileName: string, fullFileName: string, fileType: string, namePiece: string, refPiece: string, refEmplacement: string, resumePiece: string, requeteFinancement: RequeteFinancement, createdAt: string) {
    this.id = id;
    this.fileName = fileName;
    this.fullFileName = fullFileName;
    this.fileType = fileType;
    this.namePiece = namePiece;
    this.refPiece = refPiece;
    this.refEmplacement = refEmplacement;
    this.resumePiece = resumePiece;
    this.requeteFinancement = requeteFinancement;
    this.createdAt = createdAt;
  }
}
