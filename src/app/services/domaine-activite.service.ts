import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DeviseMonaieHist} from "../models/DeviseMonaieHist";
import {Observable} from "rxjs";
import {DomaineActivite} from "../models/DomaineActivite";

@Injectable({
  providedIn: 'root'
})
export class DomaineActiviteService {

  url: string = environment.backend + '/domaine-activite';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(domaineactivite: DomaineActivite ): Observable<Object> {
    return this.http.post(`${this.url}/save`, domaineactivite);
  }

  // Enregistrement des objectifs de développement durable
  delete(domaineactivite: DomaineActivite ): Observable<Object> {
    return this.http.post(`${this.url}/delete`, domaineactivite);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
