import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Localisation} from "../models/Localisation";

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {

  url: string = environment.backend + '/localisation/projet';

  constructor(private http: HttpClient) {
  }

// Enregistrement des promoteurs
  save(id: number, localisation: Localisation): Observable<Object> {
    return this.http.post(`${this.url}/save/${id}`, localisation);
  }

// Enregistrement des promoteurs
  saveAlone(localisation: Localisation): Observable<Object> {
    return this.http.post(`${this.url}/save-alone`, localisation);
  }

  // Suppression  d'un promoteur
  delete(localisation: Localisation): Observable<Object> {
    return this.http.post(`${this.url}/delete`, localisation);
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
