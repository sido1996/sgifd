import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Secteur} from "../models/Secteur";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  url: string = environment.backend + '/secteur';

  constructor(private http: HttpClient) { }

  // Enregistrement des secteurs d'activités
  save(secteur: Secteur): Observable<Object> {
    return this.http.post(`${this.url}/save`, secteur);
  }

  // Enregistrement des secteurs d'activités
  delete(secteur: Secteur): Observable<Object> {
    return this.http.post(`${this.url}/delete`, secteur);
  }

  // liste des secteurs d'activité
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste des secteurs d'activité
  listByGrandSecteur(id: number): Observable<Object> {
    return this.http.get(`${this.url}/get-by-grand-secteur/${id}`);
  }

}
