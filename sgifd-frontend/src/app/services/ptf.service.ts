import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Ptf} from "../models/Ptf";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PtfService {

  url: string = environment.backend + '/ptf-fournisseur-bailleur';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(ptf: Ptf): Observable<Object> {
    return this.http.post(`${this.url}/save`, ptf);
  }

  // Enregistrement des objectifs de développement durable
  delete(ptf: Ptf): Observable<Object> {
    return this.http.post(`${this.url}/delete`, ptf);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
