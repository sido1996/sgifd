import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TypeFondSpecifique} from "../models/TypeFondSpecifique";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TypeFondSpecifiqueService {


  url: string = environment.backend + '/type-fond-specifique';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(typefondspecifique: TypeFondSpecifique): Observable<Object> {
    return this.http.post(`${this.url}/save`, typefondspecifique);
  }

  // Enregistrement des objectifs de développement durable
  delete(typefondspecifique: TypeFondSpecifique): Observable<Object> {
    return this.http.post(`${this.url}/delete`, typefondspecifique);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
