export class InstructionRequete {
  id: number;
  libelle: string;
  dateIdentification: string;
  datePreparation: string;
  dateEvaluation: string;
  dateNegociation: string;
  dateApprobation: string;
  dateSignature: string;

  constructor(id: number, libelle: string, dateIdentification: string, datePreparation: string, dateEvaluation: string, dateNegociation: string, dateApprobation: string, dateSignature: string) {
    this.id = id;
    this.libelle = libelle;
    this.dateIdentification = dateIdentification;
    this.datePreparation = datePreparation;
    this.dateEvaluation = dateEvaluation;
    this.dateNegociation = dateNegociation;
    this.dateApprobation = dateApprobation;
    this.dateSignature = dateSignature;
  }
}
