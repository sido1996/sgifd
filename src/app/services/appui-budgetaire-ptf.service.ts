import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppuiBudgetaire } from '../models/AppuiBudgetaire';
import { Piece } from '../models/Piece/Piece';

@Injectable({
  providedIn: 'root'
})
export class AppuiBudgetairePtfService {

  url: string = environment.backend + '/appui-budgetaire-ptf';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(appuibudgetaire: AppuiBudgetaire): Observable<Object> {
    return this.http.post(`${this.url}/save`, appuibudgetaire);
  }

  // Enregistrement des objectifs de développement durable
  delete(appuibudgetaire: AppuiBudgetaire): Observable<Object> {
    return this.http.post(`${this.url}/delete`, appuibudgetaire);
  }

  // liste des objectifs de développement durable
  list(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list/` + id);
  }

  // liste des objectifs de développement durable
  listFull(): Observable<Object> {
    return this.http.get(`${this.url}/list/`);
  }

  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/detail/` + id);
  }

  // Enregistrement des pieces jointes Accord
  /* saveFile(id: number, piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save-file/${id}`, piece);
  } */
}
