import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Commune} from "../models/Commune";
import {Observable} from "rxjs";
import {DocumentProgrammatique} from "../models/document-programmatique";

@Injectable({
  providedIn: 'root'
})
export class DocumentProgrammatiqueService {

  url: string = environment.backend + '/document-programmatique';

  constructor(private http: HttpClient) { }

  save(documentProgrammatique: DocumentProgrammatique): Observable<Object> {
    return this.http.post(`${this.url}/save`, documentProgrammatique);
  }

  // Enregistrement des objectifs de développement durable
  delete(documentProgrammatique: DocumentProgrammatique): Observable<Object> {
    return this.http.post(`${this.url}/delete`, documentProgrammatique);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
