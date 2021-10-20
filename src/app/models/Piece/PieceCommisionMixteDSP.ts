
import { CommissionMixteDsp } from '../commissionMixteDsp';
export class PieceCommisionMixteDSP {

  id: number;
  fileName: string;
  fullFileName: string;
  fileType: string;
  namePiece: string;
  refPiece: string;
  refEmplacement: string;
  resumePiece: string;
  commissionMixteDSP: CommissionMixteDsp;
  createdAt: string;

 constructor(id: number, fileName: string, fullFileName: string, fileType: string, namePiece: string, refPiece: string, 
  refEmplacement: string, resumePiece: string, commissionMixteDSP: CommissionMixteDsp, createdAt: string) {
   this.id = id;
   this.fileName = fileName;
   this.fullFileName = fullFileName;
   this.fileType = fileType;
   this.namePiece = namePiece;
   this.refPiece = refPiece;
   this.refEmplacement = refEmplacement;
   this.resumePiece = resumePiece;
   this.commissionMixteDSP = commissionMixteDSP;
   this.createdAt = createdAt;
 }

}
