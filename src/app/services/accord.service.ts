import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Accord} from "../models/Accord";
import {Observable} from "rxjs";
import {Piece} from "../models/Piece/Piece";

@Injectable({
  providedIn: 'root'
})
export class AccordService {

  url: string = environment.backend + '/accord';

  constructor(private http: HttpClient) { }

  // Enregistrement des pieces jointes Accord
  saveFile(id: number, piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save-file/${id}`, piece);
  }

  // Enregistrement des Accord
  save(accord: Accord): Observable<Object> {
    return this.http.post(`${this.url}/save`, accord);
  }

  // Supression des Accord
  delete(accord: Accord): Observable<Object> {
    return this.http.post(`${this.url}/delete`, accord);
  }

  // liste des Accord
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste des Accord
  listByAnnee(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list-by-annee/${id}`);
  }

  // liste des IDE par id
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/detail/${id}`);
  }

}
