import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Localisation} from "../models/Localisation";
import {Observable} from "rxjs";
import {ProrogationProjet} from "../models/ProrogationProjet";

@Injectable({
  providedIn: 'root'
})
export class ProrogationProjetService {

  url: string = environment.backend + '/prorogation/projet';

  constructor(private http: HttpClient) {
  }

// Enregistrement des promoteurs
  save(id: number, prorogation: ProrogationProjet): Observable<Object> {
    return this.http.post(`${this.url}/save/${id}`, prorogation);
  }

// Enregistrement des promoteurs
  saveAlone(prorogation: ProrogationProjet): Observable<Object> {
    return this.http.post(`${this.url}/save-alone`, prorogation);
  }

  // Suppression  d'un promoteur
  delete(prorogation: ProrogationProjet): Observable<Object> {
    return this.http.post(`${this.url}/delete`, prorogation);
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
