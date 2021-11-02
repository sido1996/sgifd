import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {


  url: string = environment.backend + '/statistique';

  constructor(private http: HttpClient) { }

  // Enregistrement des statusAccords d'activités
  getStatsAccordYear(): Observable<Object> {
    return this.http.get(`${this.url}/accord/stat-by-year`);
  }

  getStatsAccordStatusAccord(): Observable<Object> {
    return this.http.get(`${this.url}/accord/stat-by-status-accord`);
  }

  getStatsRequeteYear(): Observable<Object> {
    return this.http.get(`${this.url}/requete-financement/stat-by-year`);
  }

  getStatsRequeteNatureFinancement(): Observable<Object> {
    return this.http.get(`${this.url}/requete-financement/stat-by-nature-financement`);
  }



  getStatsProjetRessourceInterieureByYear(): Observable<Object> {
    return this.http.get(`${this.url}/projet/stat-by-year-ressource-interieure`);
  }

  getStatsProjetRessourceExterieureByYear(): Observable<Object> {
    return this.http.get(`${this.url}/projet/stat-by-year-ressource-exterieure`);
  }

  getStatsProjetBySecteur(): Observable<Object> {
    return this.http.get(`${this.url}/projet/stat-projet-by-secteur`);
  }


  getStatsEvolutionAideSecours(): Observable<Object> {
    return this.http.get(`${this.url}/aide-secours/stat-evolution`);
  }

  getStatsEvolutionCooperation(): Observable<Object> {
    return this.http.get(`${this.url}/cooperation-decentralisee/stat-evolution`);
  }
}
