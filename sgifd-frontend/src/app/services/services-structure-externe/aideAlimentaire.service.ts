import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../../environments/environment';
import { Piece } from '../../models/Piece/Piece';
import { AideAlimentaire } from '../../models/AideAlimentaire';

@Injectable({
  providedIn: 'root'
})
export class AideAlimentaireService {

  url: string = environment.backend + '/aide-secours/structure';

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
  listAideAlimentairesStructure(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // recherche d'une aideAlimentaire connaissant son id
  getById(id:number): Observable<Object> {
    return this.http.get(`${this.url}/detail-aide-alimentaire/${id}`);
  }

}
