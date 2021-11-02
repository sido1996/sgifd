import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TypeAssistance} from '../models/TypeAssistance';
import { TypeAppuiBudgetaire } from '../models/TypeAppuiBudgetaire';

@Injectable({
  providedIn: 'root'
})
export class TypeAppuiBudgetaireService {

  url: string = environment.backend + '/type-appui-budgetaire';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(typeappuibudgetaire: TypeAppuiBudgetaire): Observable<Object> {
    return this.http.post(`${this.url}/save`, typeappuibudgetaire);
  }

  // Enregistrement des objectifs de développement durable
  delete(typeappuibudgetaire: TypeAppuiBudgetaire): Observable<Object> {
    return this.http.post(`${this.url}/delete`, typeappuibudgetaire);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }
}
