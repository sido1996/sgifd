import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RequeteFinancement} from "../models/RequeteFinancement";
import {Observable} from "rxjs";
import {PieceRequeteFinancement} from "../models/Piece/PieceRequeteFinancement";
import {Piece} from "../models/Piece/Piece";

@Injectable({
  providedIn: 'root'
})
export class RequeteFinancementService {


  url: string = environment.backend + '/requete-financement';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(requetefinancement: RequeteFinancement): Observable<Object> {
    return this.http.post(`${this.url}/save`, requetefinancement);
  }

  // Enregistrement des objectifs de développement durable
  saveFile(id: number, piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save-file/${id}`, piece);
  }

  // Enregistrement des objectifs de développement durable
  delete(requetefinancement: RequeteFinancement): Observable<Object> {
    return this.http.post(`${this.url}/delete`, requetefinancement);
  }

  // liste des objectifs de développement durable
  listClose(): Observable<Object> {
    return this.http.get(`${this.url}/list-close`);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste des objectifs de développement durable
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/detail/${id}`);
  }

  // liste des objectifs de développement durable
  relancer(id: number): Observable<Object> {
    return this.http.get(`${this.url}/relancer/${id}`);
  }

  // liste des objectifs de développement durable
  close(requete: RequeteFinancement): Observable<Object> {
    return this.http.post(`${this.url}/close`, requete);
  }

}
