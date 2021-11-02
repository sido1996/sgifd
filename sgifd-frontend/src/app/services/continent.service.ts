import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs";
import {Pays} from "../models/Pays";
import { Continent } from '../models/Continent';

@Injectable({
  providedIn: 'root'
})
export class ContinentService {

  url: string = environment.backend + '/continent';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(continent: Continent): Observable<Object> {
    return this.http.post(`${this.url}/save`, continent);
  }

  // Enregistrement des objectifs de développement durable
  delete(continent: Continent): Observable<Object> {
    return this.http.post(`${this.url}/delete`, continent);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
