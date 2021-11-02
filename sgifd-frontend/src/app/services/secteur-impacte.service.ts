import { Injectable } from '@angular/core';
import {SecteurImpacte} from "../models/SecteurImpacte";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SecteurImpacteService {


  url: string = environment.backend + '/secteur-impacte/projet';

  constructor(private http: HttpClient) {
  }

// Enregistrement des promoteurs
  save(id: number, secteurImpacte: SecteurImpacte): Observable<Object> {
    return this.http.post(`${this.url}/save/${id}`, secteurImpacte);
  }

// Enregistrement des promoteurs
  saveAlone(secteurImpacte: SecteurImpacte): Observable<Object> {
    return this.http.post(`${this.url}/save-alone`, secteurImpacte);
  }

  // Suppression  d'un promoteur
  delete(secteurImpacte: SecteurImpacte): Observable<Object> {
    return this.http.post(`${this.url}/delete`, secteurImpacte);
  }

  // liste  des promoteurs
  list(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list/${id}`);
  }

  // liste  des promoteurs
  detail(id: number): Observable<Object> {
    return this.http.get(`${this.url}/detail/${id}`);
  }

}
