import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Pays} from "../models/Pays";
import {Observable} from "rxjs";
import {CategoriePTF} from "../models/CategoriePTF";

@Injectable({
  providedIn: 'root'
})
export class CategoriePtfService {

  url: string = environment.backend + '/categorie-ptf';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(categorieptf: CategoriePTF): Observable<Object> {
    return this.http.post(`${this.url}/save`, categorieptf);
  }

  // Enregistrement des objectifs de développement durable
  delete(categorieptf: CategoriePTF): Observable<Object> {
    return this.http.post(`${this.url}/delete`, categorieptf);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
