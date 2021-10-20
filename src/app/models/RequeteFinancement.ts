
import {CategoriePTF} from "./CategoriePTF";
import {Pays} from "./Pays";
import {DomainePTF} from "./DomainePTF";
import {RegroupementClubPtf} from "./RegroupementClubPtf";
import {Cible} from "./Cible";
import {Ptf} from "./Ptf";
import {Structure} from "./Structure";
import {ProjetIdee} from "./ProjetIdee";
import {RelanceRequeteFinancement} from "./RelanceRequeteFinancement";
import {ReponseRequeteFinancement} from "./ReponseRequeteFinancement";
import {TypeAppreciation} from "./TypeAppreciation";
import {PieceRequeteFinancement} from "./Piece/PieceRequeteFinancement";
import {ProjetProgrammeIdee} from "./ProjetProgrammeIdee";
import {InstructionRequete} from "./InstructionRequete";
import {ProjetProgramme} from "./ProjetProgramme";
import { ProjetProgrammeFinalise } from './ProjetProgrammeFinalise';
import {RessourceExterieure} from "./RessourceExterieure";

export class RequeteFinancement {

  id: number;
  projetProgrammeIdee: ProjetProgrammeFinalise;
  dateEnvoiRequete: string;
  dateMissionPreparation: string;
  aideMemoireMission: string;
  createBy:	string;
  deleteBy:	string;
  isStatusClose: boolean;
  dateClose: string;
  closeAppreciation: string;
  closeReason: string;
  typeAppreciation: TypeAppreciation;
  files: Array<PieceRequeteFinancement>;
  instructionRequetes: Array<InstructionRequete>;
  ressourceExterieures: Array<RessourceExterieure>;

}
