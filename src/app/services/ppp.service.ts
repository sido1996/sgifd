import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { PPP } from '../models/PPP';
import {Piece} from "../models/Piece/Piece";

@Injectable({
  providedIn: 'root'
})
export class PPPService {

  url: string = environment.backend + '/ppp';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  saveFile(id: number, piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save-file/${id}`, piece);
  }

  // Enregistrement des objectifs de développement durable
  save(ppp: PPP): Observable<Object> {
    return this.http.post(`${this.url}/save`, ppp);
  }

  // Enregistrement des objectifs de développement durable
  delete(ppp: PPP): Observable<Object> {
    return this.http.post(`${this.url}/delete`, ppp);
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
