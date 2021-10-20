import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Arrondissement} from "../models/Arrondissement";
import {Observable} from "rxjs";
import { Promoteur } from '../models/Promoteur';

@Injectable({
  providedIn: 'root'
})
export class PromoteurService {

  url: string = environment.backend + '/promoteur';

  constructor(private http: HttpClient) { }

  // Enregistrement des promoteurs
  save(promoteur: Promoteur): Observable<Object> {
    return this.http.post(`${this.url}/save`, promoteur);
  }

  // Suppression  d'un promoteur
  delete(promoteur: Promoteur): Observable<Object> {
    return this.http.post(`${this.url}/delete`, promoteur);
  }

  // liste  des promoteurs
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
