import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Ptf} from "../models/Ptf";
import {Observable} from "rxjs";
import {Rapport} from "../models/rapport";
import {RapportParams} from "../models/rapport-params";

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  url: string = environment.backend + '/rapport';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(rapport: Rapport): Observable<Object> {
    return this.http.post(`${this.url}/save`, rapport);
  }

  // Enregistrement des objectifs de développement durable
  rapport(rapport: Rapport) {
    return this.http.post(`${this.url}/rapport-pdf`, rapport, { responseType: 'blob'});
  }

  // Enregistrement des objectifs de développement durable
  delete(rapport: Rapport): Observable<Object> {
    return this.http.post(`${this.url}/delete`, rapport);
  }

  // Enregistrement des objectifs de développement durable
  deleteParam(rapport: RapportParams): Observable<Object> {
    return this.http.post(`${this.url}/delete-param`, rapport);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste des objectifs de développement durable
  detail(id: number): Observable<Object> {
    return this.http.get(`${this.url}/detail/${id}`);
  }

}
