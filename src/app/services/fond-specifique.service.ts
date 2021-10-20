import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FondSpecifique} from "../models/FondSpecifique";
import {Observable} from "rxjs";
import { Piece } from '../models/Piece/Piece';

@Injectable({
  providedIn: 'root'
})
export class FondSpecifiqueService {

  url: string = environment.backend + '/fond-specifique';

  constructor(private http: HttpClient) { }

   // Enregistrement des objectifs de développement durable
   saveFile(id: number, piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save-file/${id}`, piece);
  }

  // Enregistrement des objectifs de développement durable
  save(fondspecifique: FondSpecifique): Observable<Object> {
    return this.http.post(`${this.url}/save`, fondspecifique);
  }

  // Enregistrement des objectifs de développement durable
  delete(fondspecifique: FondSpecifique): Observable<Object> {
    return this.http.post(`${this.url}/delete`, fondspecifique);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste des objectifs de développement durable
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/detail/${id}`);
  }

}
