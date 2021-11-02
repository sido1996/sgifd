import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Cible} from "../models/Cible";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CibleService {

  url: string = environment.backend + '/cible';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(cible: Cible): Observable<Object> {
    return this.http.post(`${this.url}/save`, cible);
  }

  // Enregistrement des objectifs de développement durable
  delete(cible: Cible): Observable<Object> {
    return this.http.post(`${this.url}/delete`, cible);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste des objectifs de développement durable
  listByODD(id: number): Observable<Object> {
    return this.http.get(`${this.url}/getByODD/${id}`);
  }

}
