
export class Piece {

  id: number;
  fileName: string;
  fullFileName: string;
  fileType: string;
  namePiece: string;
  refPiece: string;
  refEmplacement: string;
  resumePiece: string;
  createdAt: string;

  constructor(id: number, fileName: string, fullFileName: string, fileType: string, namePiece: string, refPiece: string, refEmplacement: string, resumePiece: string, createdAt: string) {
    this.id = id;
    this.fileName = fileName;
    this.fullFileName = fullFileName;
    this.fileType = fileType;
    this.namePiece = namePiece;
    this.refPiece = refPiece;
    this.refEmplacement = refEmplacement;
    this.resumePiece = resumePiece;
    this.createdAt = createdAt;
  }
}
