import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RessourceExterieure} from "../models/RessourceExterieure";

@Injectable({
  providedIn: 'root'
})
export class RessourceExeterieureService {

  url: string = environment.backend + '/ressource-exterieure/projet';

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
  open(id: number): Observable<Object> {
    return this.http.get(`${this.url}/open/${id}`);
  }

  // liste  des promoteurs
  close(id: number, typeCloture: string): Observable<Object> {
    return this.http.get(`${this.url}/close/${id}/${typeCloture}`);
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
