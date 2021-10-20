import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Arrondissement} from "../models/Arrondissement";
import {Observable} from "rxjs";
import { AideAlimentaire } from '../models/AideAlimentaire';
import {Piece} from "../models/Piece/Piece";

@Injectable({
  providedIn: 'root'
})
export class AideAlimentaireService {

  url: string = environment.backend + '/aide-secours';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  saveFile(id: number, piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save-file/${id}`, piece);
  }

  // Enregistrement des arrondissements
  save(aideAlimentaire: AideAlimentaire): Observable<Object> {
    return this.http.post(`${this.url}/save-aide-alimentaire`, aideAlimentaire);
  }

  // Suppression  d'un arrondissement
  delete(aideAlimentaire: AideAlimentaire): Observable<Object> {
    return this.http.post(`${this.url}/delete-aide-alimentaire`, aideAlimentaire);
  }

  // liste  des aides alimentaires
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list-aides-alimentaires`);
  }

  // liste  des aides alimentaires
  listAideStructure(id:number): Observable<Object> {
    return this.http.get(`${this.url}/list-aides-alimentaires/${id}`);
  }

  // recherche d'une aideAlimentaire connaissant son id
  getById(id:number): Observable<Object> {
    return this.http.get(`${this.url}/detail-aide-alimentaire/${id}`);
  }

}
