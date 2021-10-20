import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DomaineActivite} from "../models/DomaineActivite";
import {Observable} from "rxjs";
import {Envergure} from "../models/Envergure";

@Injectable({
  providedIn: 'root'
})
export class EnvergureService {

  url: string = environment.backend + '/envergure';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(envergure: Envergure ): Observable<Object> {
    return this.http.post(`${this.url}/save`, envergure);
  }

  // Enregistrement des objectifs de développement durable
  delete(envergure: Envergure ): Observable<Object> {
    return this.http.post(`${this.url}/delete`, envergure);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
