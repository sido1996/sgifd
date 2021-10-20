import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SousSecteur} from "../models/SousSecteur";

@Injectable({
  providedIn: 'root'
})
export class SousSecteurService {

  url: string = environment.backend + '/sous-secteur';

  constructor(private http: HttpClient) { }

  // Enregistrement des exercices d'activités
  save(soussecteur: SousSecteur): Observable<Object> {
    return this.http.post(`${this.url}/save`, soussecteur);
  }

  // Enregistrement des exercices d'activités
  delete(soussecteur: SousSecteur): Observable<Object> {
    return this.http.post(`${this.url}/delete`, soussecteur);
  }

  // liste des exercices d'activité
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste des exercices d'activité
  listBySecteur(id: number): Observable<Object> {
    return this.http.get(`${this.url}/get-by-secteur/${id}`);
  }

}
