import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Structure} from "../models/Structure";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  url: string = environment.backend + '/structure';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(structure: Structure): Observable<Object> {
    return this.http.post(`${this.url}/save`, structure);
  }

  // Enregistrement des objectifs de développement durable
  delete(structure: Structure): Observable<Object> {
    return this.http.post(`${this.url}/delete`, structure);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
