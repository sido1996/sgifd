import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Pays} from "../models/Pays";
import {Observable} from "rxjs";
import {NiveauMaturite} from "../models/NiveauMaturite";

@Injectable({
  providedIn: 'root'
})
export class NiveauMaturiteService {

  url: string = environment.backend + '/niveau-maturite';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(niveaumaturite: NiveauMaturite): Observable<Object> {
    return this.http.post(`${this.url}/save`, niveaumaturite);
  }

  // Enregistrement des objectifs de développement durable
  delete(niveaumaturite: NiveauMaturite): Observable<Object> {
    return this.http.post(`${this.url}/delete`, niveaumaturite);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
