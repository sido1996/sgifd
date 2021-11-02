import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Departement} from "../models/Departement";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  url: string = environment.backend + '/departement';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(departement: Departement): Observable<Object> {
    return this.http.post(`${this.url}/save`, departement);
  }

  // Enregistrement des objectifs de développement durable
  delete(departement: Departement): Observable<Object> {
    return this.http.post(`${this.url}/delete`, departement);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
