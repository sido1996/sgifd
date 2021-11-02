import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs";
import {Pays} from "../models/Pays";

@Injectable({
  providedIn: 'root'
})
export class SexeService {

  url: string = environment.backend + '/sexe';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(pays: Pays): Observable<Object> {
    return this.http.post(`${this.url}/save`, pays);
  }

  // Enregistrement des objectifs de développement durable
  delete(pays: Pays): Observable<Object> {
    return this.http.post(`${this.url}/delete`, pays);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
