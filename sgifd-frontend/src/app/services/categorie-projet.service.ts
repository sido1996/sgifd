import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategorieProjet} from "../models/CategorieProjet";

@Injectable({
  providedIn: 'root'
})
export class CategorieProjetService {

  url: string = environment.backend + '/categorie-projet';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(categorieprojet: CategorieProjet): Observable<Object> {
    return this.http.post(`${this.url}/save`, categorieprojet);
  }

  // Enregistrement des objectifs de développement durable
  delete(categorieprojet: CategorieProjet): Observable<Object> {
    return this.http.post(`${this.url}/delete`, categorieprojet);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
