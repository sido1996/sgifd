import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Arrondissement} from "../models/Arrondissement";
import {Observable} from "rxjs";
import { Ide } from '../models/Ide';
import { Piece } from '../models/Piece/Piece';

@Injectable({
  providedIn: 'root'
})
export class IdeService {

  url: string = environment.backend + '/ide';

  constructor(private http: HttpClient) { }

  
  // Enregistrement des pieces jointes IDE
  saveFile(id: number, piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save-file/${id}`, piece);
  }


  // Enregistrement des IDE
  save(ide: Ide): Observable<Object> {
    return this.http.post(`${this.url}/save`, ide);
  }

  // Suppression  d'un IDE
  delete(ide: Ide): Observable<Object> {
    return this.http.post(`${this.url}/delete`, ide);
  }

  // liste  des IDE
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }
  // liste des IDEs
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/detail/${id}`);
  }


}
