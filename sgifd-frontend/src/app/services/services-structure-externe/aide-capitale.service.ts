import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Piece } from '../../models/Piece/Piece';
import { AideCapitale } from '../../models/AideCapitale';

@Injectable({
  providedIn: 'root'
})
export class AideCapitaleService {

  url: string = environment.backend + '/aide-secours/structure';

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

  // liste  des aides alimentaires Bourses par structure
  listBourseFormation(): Observable<Object> {
    return this.http.get(`${this.url}/list-bourse`);
  }

  // liste des Aide capital
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/detail-bourse/${id}`);
  }
}
