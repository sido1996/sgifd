import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Commune} from "../models/Commune";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  url: string = environment.backend + '/commune';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(commune: Commune): Observable<Object> {
    return this.http.post(`${this.url}/save`, commune);
  }

  // Enregistrement des objectifs de développement durable
  delete(commune: Commune): Observable<Object> {
    return this.http.post(`${this.url}/delete`, commune);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  listParDepartement(id:number): Observable<Object> {
    return this.http.get(`${this.url}/list/`+id);
  }

}
