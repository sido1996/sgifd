import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { PPP } from '../models/PPP';
import { Piece } from '../models/Piece/Piece';
import {CommissionMixteDsp} from "../models/CommissionMixteDsp";

@Injectable({
  providedIn: 'root'
})
export class CommissionMixteDspService {

  url: string = environment.backend + '/commission-mixte-dsp';

  constructor(private http: HttpClient) { }

  // Enregistrement des pieces jointes Commissions Mixtes DSP
  saveFile(id: number, piece: Piece): Observable<Object> {
    return this.http.post(`${this.url}/save-file/${id}`, piece);
  }

  // Enregistrement des  Commissions Mixtes DSP
  save(commissionMixteDsp: CommissionMixteDsp): Observable<Object> {
    return this.http.post(`${this.url}/save`, commissionMixteDsp);
  }

  // Enregistrement des  Commissions Mixtes DSP
  delete(commissionMixteDsp: CommissionMixteDsp): Observable<Object> {
    return this.http.post(`${this.url}/delete`, commissionMixteDsp);
  }

  // liste des  Commissions Mixtes DSP
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  // liste des  Commissions Mixtes DSP
  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/detail/${id}`);
  }

}
