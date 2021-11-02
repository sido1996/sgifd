
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { Piece } from '../../models/Piece/Piece';
import { ProjetProgrammeIdee } from '../../models/ProjetProgrammeIdee';
import { ProjetProgramme } from '../../models/ProjetProgramme';
import { ProjetProgrammeFinalise } from '../../models/ProjetProgrammeFinalise';


@Injectable({
  providedIn: 'root'
})
export class ProjetProgrammeService {

  url: string = environment.backend + '/projet-programme-idee/structure';

  constructor(private http: HttpClient) { }


  // Enregistrement des pieces jointes Accord
  saveFile(id: number, piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save-file/${id}`, piece);
  }

  // Enregistrement des objectifs de développement durable
  save(projetprogramme: ProjetProgramme): Observable<Object> {
    return this.http.post(`${this.url}/save`, projetprogramme);
  }

  // Enregistrement des objectifs de développement durable
  saveFinal(projetprogramme: ProjetProgrammeFinalise): Observable<Object> {
    return this.http.post(`${this.url}/save`, projetprogramme);
  }

  // Enregistrement des objectifs de développement durable
  saveProjetProgrammeIdee(projetprogramme: ProjetProgrammeIdee): Observable<Object> {
    return this.http.post(`${this.url}/save`, projetprogramme);
  }
  // Enregistrement des objectifs de développement durable
  delete(projetprogramme: ProjetProgramme): Observable<Object> {
    return this.http.post(`${this.url}/delete`, projetprogramme);
  }

  // liste des objectifs de développement durable
  listCloturer(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list-cloturer/${id}`);
  }

  verifierDoublonByReferenceRessource(reference: string): Observable<Object> {
    return this.http.get(`${this.url}/doublon-reference/${reference}`);
  }

  // liste des objectifs de développement durable
  listEnCoursByAnneeByStructure(idAnnee: number): Observable<Object> {
    return this.http.get(`${this.url}/list-en-cours-by-structure-by-annee/${idAnnee}`);
  }

  // liste des objectifs de développement durable
  listByAnneeByStructure(idAnnee: number, idStructure: number): Observable<Object> {
    return this.http.get(`${this.url}/list-en-cours-by-structure-by-annee/${idAnnee}/${idStructure}`);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }


  // liste des objectifs de développement durable
  listGlobal(): Observable<Object> {
    return this.http.get(`${this.url}/list-globale`);
  }

  // liste des objectifs de développement durable
  listProjetSoumis(): Observable<Object> {
    return this.http.get(`${this.url}/list-projet-elus-by-structure/`);
  }

  // liste des objectifs de développement durable
  getById(idStructure: number): Observable<Object> {
    return this.http.get(`${this.url}/detail/${idStructure}`);
  }

  // liste des objectifs de développement durable
  cloturer(projetprogramme: ProjetProgramme): Observable<Object> {
    return this.http.post(`${this.url}/cloturer`, projetprogramme);
  }

  // liste des objectifs de développement durable
  relancer(id: number): Observable<Object> {
    return this.http.get(`${this.url}/relancer/${id}`);
  }

  // liste des objectifs de développement durable
  listEnCours(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list-en-cours/${id}`);
  }


  // liste des objectifs de développement durable
  listAccords(id: number): Observable<Object> {
    return this.http.get(`${this.url}/liste-accords/${id}`);
  }

  joindreUnAccord(idProjet: number, idAccord: number): Observable<Object> {
    return this.http.get(`${this.url}/joindre-accord/${idProjet}/${idAccord}`);
  }

  enleverUnAccord(idProjet: number, idAccord: number): Observable<Object> {
    return this.http.get(`${this.url}/enlever-accord/${idProjet}/${idAccord}`);
  }


  // liste des objectifs de développement durable
  verifierDoublonByLibelle(keyWork: string): Observable<Object> {
    return this.http.post(`${this.url}/rechercher-doublon`, keyWork);
  }

}
