import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AideCapitale } from '../models/AideCapitale';
import {Piece} from "../models/Piece/Piece";

@Injectable({
  providedIn: 'root'
})
export class AideCapitaleService {

  url: string = environment.backend + '/aide-secours';

  constructor(private http: HttpClient) { }


  // Enregistrement des objectifs de développement durable
  saveFile(id: number, piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save-file/${id}`, piece);
  }

  // Enregistrement des aideCapitales
  save(aideCapitale: AideCapitale): Observable<Object> {
    return this.http.post(`${this.url}/save`, aideCapitale);
  }

  // Suppression  d'un aideCapitale
  delete(aideCapitale: AideCapitale): Observable<Object> {
    return this.http.post(`${this.url}/delete`, aideCapitale);
  }

  // liste  des aideCapitales
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  listParCommune(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list/` + id);
  }
  // liste des Aide capital
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/detail-bourse/${id}`);
  }
}
