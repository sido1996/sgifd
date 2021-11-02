import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RessourceExterieure} from "../models/RessourceExterieure";

@Injectable({
  providedIn: 'root'
})
export class RessourceExterieureService {

  url: string = environment.backend + '/requete-financement/ressource-exterieure';

  constructor(private http: HttpClient) {
  }

// Enregistrement des promoteurs
  save(id: number, ressourceExterieure: RessourceExterieure): Observable<Object> {
    return this.http.post(`${this.url}/save/${id}`, ressourceExterieure);
  }

// Enregistrement des promoteurs
  saveAlone(ressourceExterieure: RessourceExterieure): Observable<Object> {
    return this.http.post(`${this.url}/save-alone`, ressourceExterieure);
  }

  // Suppression  d'un promoteur
  delete(ressourceExterieure: RessourceExterieure): Observable<Object> {
    return this.http.post(`${this.url}/delete`, ressourceExterieure);
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
