import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DomaineActivite} from "../models/DomaineActivite";
import {Observable} from "rxjs";
import {PieceRequeteFinancement} from "../models/Piece/PieceRequeteFinancement";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  url: string = environment.backend + '/piece';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  savePieceRequete(pieceRequete: PieceRequeteFinancement ): Observable<Object> {
    return this.http.post(`${this.url}/save-piece`, pieceRequete);
  }

}
