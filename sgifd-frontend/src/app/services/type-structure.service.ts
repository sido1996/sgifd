import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Pays} from "../models/Pays";
import {Observable} from "rxjs";
import {TypeStructure} from "../models/TypeStructure";

@Injectable({
  providedIn: 'root'
})
export class TypeStructureService {


  url: string = environment.backend + '/type-structure';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(typestructure: TypeStructure): Observable<Object> {
    return this.http.post(`${this.url}/save`, typestructure);
  }

  // Enregistrement des objectifs de développement durable
  delete(typestructure: TypeStructure): Observable<Object> {
    return this.http.post(`${this.url}/delete`, typestructure);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
