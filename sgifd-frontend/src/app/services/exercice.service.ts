import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Exercice} from "../models/Exercice";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {

  url: string = environment.backend + '/exercice';

  constructor(private http: HttpClient) { }

  // Enregistrement des exercices d'activités
  save(exercice: Exercice): Observable<Object> {
    return this.http.post(`${this.url}/save`, exercice);
  }

  // Enregistrement des exercices d'activités
  delete(exercice: Exercice): Observable<Object> {
    return this.http.post(`${this.url}/delete`, exercice);
  }

  // liste des exercices d'activité
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

}
