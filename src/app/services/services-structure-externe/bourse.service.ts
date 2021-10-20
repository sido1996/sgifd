import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../../environments/environment';
import { Bourse } from '../../models/Bourse';

@Injectable({
  providedIn: 'root'
})
export class BourseService {

  url: string = environment.backend + '/bourse';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(bourse: Bourse): Observable<Object> {
    return this.http.post(`${this.url}/save`, bourse);
  }

  // Enregistrement des objectifs de développement durable
  delete(bourse: Bourse): Observable<Object> {
    return this.http.post(`${this.url}/delete`, bourse);
  }

  // Enregistrement des objectifs de développement durable
  deleteModification(bourse: Bourse): Observable<Object> {
    return this.http.post(`${this.url}/deleteonupdate`, bourse);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  /* listParDepartement(id:number): Observable<Object> {
    return this.http.get(`${this.url}/list/`+id);
  } */

}
