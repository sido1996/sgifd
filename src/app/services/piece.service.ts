import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PilierPAG} from "../models/PilierPAG";
import {Observable} from "rxjs";
import {Piece} from "../models/Piece/Piece";

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  url: string = environment.backend + '/piece';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save`, piece);
  }

  // Enregistrement des objectifs de développement durable
  delete(piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/delete-piece`, piece);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  downloadFile(fileName: string): Observable<Blob> {

    return this.http.get(this.url + '/downloadFile/' + fileName,  {responseType: 'blob'});

  }

}
