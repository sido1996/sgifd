import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RessourceInterieureAnnuelle} from "../models/RessourceInterieureAnnuelle";

@Injectable({
  providedIn: 'root'
})
export class RessourceInterieureAnnuelleService {

  url: string = environment.backend + '/ressource-interieure-annuelle/projet';

  constructor(private http: HttpClient) {
  }

// Enregistrement des promoteurs
  save(id: number, ressourceInterieure: RessourceInterieureAnnuelle): Observable<Object> {
    return this.http.post(`${this.url}/save/${id}`, ressourceInterieure);
  }

// Enregistrement des promoteurs
  saveAlone(ressourceInterieure: RessourceInterieureAnnuelle): Observable<Object> {
    return this.http.post(`${this.url}/save-alone`, ressourceInterieure);
  }

  // Suppression  d'un promoteur
  delete(ressourceInterieure: RessourceInterieureAnnuelle): Observable<Object> {
    return this.http.post(`${this.url}/delete`, ressourceInterieure);
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
