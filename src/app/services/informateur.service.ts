import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Arrondissement} from "../models/Arrondissement";
import {Observable} from "rxjs";
import { Informateur } from '../models/Informateur';

@Injectable({
  providedIn: 'root'
})
export class InformateurService {

  url: string = environment.backend + '/informateur';

  constructor(private http: HttpClient) { }

  // Enregistrement des informateurs
  save(informateur: Informateur): Observable<Object> {
    return this.http.post(`${this.url}/save`, informateur);
  }

  // Suppression  d'un informateurs
  delete(informateur: Informateur): Observable<Object> {
    return this.http.post(`${this.url}/delete`, informateur);
  }

  // liste  des informateurs
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste  des informateurs
  listBySourceInformation(idSource: number): Observable<Object> {
    return this.http.get(`${this.url}/list-by-source/${idSource}`);
  }

  // Recherche d'un informateur vie emailOrTel de user connecté
  rechercheInformateur(): Observable<Object> {
    return this.http.get(`${this.url}/recherche-informateur/`);
  }

}
