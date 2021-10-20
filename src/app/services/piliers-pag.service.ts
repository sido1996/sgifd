import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PilierPAG} from "../models/PilierPAG";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PiliersPagService {

  url: string = environment.backend + '/pilier-pag';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(pilierpag: PilierPAG): Observable<Object> {
    return this.http.post(`${this.url}/save`, pilierpag);
  }

  // Enregistrement des objectifs de développement durable
  delete(pilierpag: PilierPAG): Observable<Object> {
    return this.http.post(`${this.url}/delete`, pilierpag);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
