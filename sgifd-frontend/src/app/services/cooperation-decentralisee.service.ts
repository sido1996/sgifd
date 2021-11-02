import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CooperationDecentralisee} from "../models/CooperationDecentralisee";
import {Observable} from "rxjs";
import {Piece} from "../models/Piece/Piece";

@Injectable({
  providedIn: 'root'
})
export class CooperationDecentraliseeService {


  url: string = environment.backend + '/cooperation-decentralisee';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  saveFile(id: number, piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save-file/${id}`, piece);
  }

  // Enregistrement des objectifs de développement durable
  save(cooperationdecentralisee: CooperationDecentralisee): Observable<Object> {
    return this.http.post(`${this.url}/save`, cooperationdecentralisee);
  }

  // Enregistrement des objectifs de développement durable
  delete(cooperationdecentralisee: CooperationDecentralisee): Observable<Object> {
    return this.http.post(`${this.url}/delete`, cooperationdecentralisee);
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
