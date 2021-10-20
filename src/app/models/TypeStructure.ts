import {TypeCooperation} from "./TypeCooperation";
import {DocumentProgrammatique} from "./document-programmatique";

export class TypeStructure {
  id: number;
  libelle:	string;
  createBy:	string;
  deleteBy:	string;
  typeCooperationList: TypeCooperation[];
  documentProgrammatiqueList: DocumentProgrammatique[];
}
