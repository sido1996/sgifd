import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { DetailFondSpecifique } from '../models/DetailFondSpecifique';

@Injectable({
  providedIn: 'root'
})
export class DetailFondSpecifiqueService {

  url: string = environment.backend + '/detail-fond-specifique';

  constructor(private http: HttpClient) { }

  // Enregistrement des arrondissements
  save(detailFondSpecifique: DetailFondSpecifique): Observable<Object> {
    return this.http.post(`${this.url}/save`, detailFondSpecifique);
  }

  // Suppression  d'un arrondissement
  delete(detailFondSpecifique: DetailFondSpecifique): Observable<Object> {
    return this.http.post(`${this.url}/delete`, detailFondSpecifique);
  }

  // liste  des arrondissement
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  getByFondSpecifique(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list/` + id);
  }

}
