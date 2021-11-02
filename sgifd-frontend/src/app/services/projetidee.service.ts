import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProjetIdee} from "../models/ProjetIdee";
import {Observable} from "rxjs";
import {ProjetProgrammeIdee} from "../models/ProjetProgrammeIdee";
import {Piece} from "../models/Piece/Piece";

@Injectable({
  providedIn: 'root'
})
export class ProjetideeService {

  url: string = environment.backend + '/projet-programme-idee';

  constructor(private http: HttpClient) { }


  // Enregistrement des pieces jointes Accord
  saveFile(id: number, piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save-file/${id}`, piece);
  }

  // Enregistrement des objectifs de développement durable
  save(projetIdee: ProjetIdee): Observable<Object> {
    return this.http.post(`${this.url}/save`, projetIdee);
  }

  // Enregistrement des objectifs de développement durable
  saveProjetProgrammeIdee(projetprogramme: ProjetProgrammeIdee): Observable<Object> {
    return this.http.post(`${this.url}/save`, projetprogramme);
  }

  // Enregistrement des objectifs de développement durable
  delete(projetIdee: ProjetIdee): Observable<Object> {
    return this.http.post(`${this.url}/delete`, projetIdee);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste des objectifs de développement durable
  listGlobal(): Observable<Object> {
    return this.http.get(`${this.url}/list-globale`);
  }

}
