
export class ConditionSuspensiveUnDecaissement {

  createBy: string;
  deleteBy: string;
  etat: string;
  id: number;
  libelle: string;
  observations: string;

  constructor(createBy: string, deleteBy: string, etat: string, id: number, libelle: string, observations: string) {
    this.createBy = createBy;
    this.deleteBy = deleteBy;
    this.etat = etat;
    this.id = id;
    this.libelle = libelle;
    this.observations = observations;
  }
}
