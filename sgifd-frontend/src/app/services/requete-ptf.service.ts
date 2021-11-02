import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RessourceExterieure} from "../models/RessourceExterieure";
import { ProjetProgramme } from '../models/ProjetProgramme';
import {ProjetProgrammeFinalise} from "../models/ProjetProgrammeFinalise";

@Injectable({
  providedIn: 'root'
})
export class RequetePtfService {

  url: string = environment.backend + '/admin-ptf';

  constructor(private http: HttpClient) {
  }

/*les utilisés*/


// liste  des requêtes  de financements (ressources extérieurs) adressées encours (new)
listRequetePtfEncours(): Observable<Object> {
  return this.http.get(`${this.url}/list-requete-ptf`);
}


// liste  des requêtes  de financements (ressources extérieurs) adressées cloturés (new)
listRequetePtfClotures(): Observable<Object> {
  return this.http.get(`${this.url}/list-requete-clotures-ptf`);
}


// liste  projet financés (new)
listProjetFinancesAnnuel(id: number): Observable<Object> {
  return this.http.get(`${this.url}/liste-projets-finances-annuel?id=`+id);
}


// liste  projet financés (new) : nombre projets pour combo de Enregistrement projet
listProjetFinances(): Observable<Object> {
  return this.http.get(`${this.url}/liste-projets-finances`);
}



// Nombre  projets financés (new) : nombre projets pour dashbord
nombreProjetFinances(): Observable<Object> {
  return this.http.get(`${this.url}/nombre-projets-finances`);
}

//liste financement annuelle projet
financementAnnuelProjet(id: number): Observable<Object> {
  return this.http.get(`${this.url}/liste-financement-annuelle-projet?id=`+id);
}


//liste financement projet : nomtant dashbord
listFinancementProjet(): Observable<Object> {
  return this.http.get(`${this.url}/liste-financement-projet`);
}

//detail pour requete encours et cloturérs
getAllById(id: number): Observable<Object> {
  return this.http.get(`${this.url}/detail-all/${id}`);
}


// detail  projet financés (new)
getDetailProjetFinancesByIdP(idP: number): Observable<Object> {
  return this.http.get(`${this.url}/detail-projet-ptf/${idP}`);
}

  // Enregistrement nouveau projet
  save(projetprogramme: ProjetProgrammeFinalise): Observable<Object> {
    return this.http.post(`${this.url}/save`, projetprogramme);
  }

  // get  projet par ref (new)
  getProjetByRef(ref: string): Observable<Object> {
    return this.http.get(`${this.url}/projet-by-ref/${ref}`);
  }

/*les non utilisés*/

   // liste  des requêtes  de financements (ressources extérieurs) adressées encours
   listRequeteEncours(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list-requete-ptf-Encours?id=`+id);
  }

  // liste  des requêtes  de financements (ressources extérieurs) adressées cloturés
  listRequeteClotures(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list-requete-ptf-Clotures?id=`+id);
  }



  getById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/detail-ressource/${id}`);
  }

  getRequeteByIdP(idP: number): Observable<Object> {
    return this.http.get(`${this.url}/detail-requeteFinancement/${idP}`);
  }

  getProjetFinances(): Observable<Object> {
    return this.http.get(`${this.url}/liste-projets-finances`);
  }

// liste  des requêtes  de financements (ressources extérieurs) adressées encours
listEncours(id: number): Observable<Object> {
  return this.http.get(`${this.url}/list-requete-Encours?id=`+id);
}

  // liste  des requêtes  de financements (ressources extérieurs) adressées encours
  listClotures(id: number): Observable<Object> {
    return this.http.get(`${this.url}/list-requete-Clotures/${id}`);
  }


  getByIdP(idP: number): Observable<Object> {
    return this.http.get(`${this.url}/detail-projet/${idP}`);
  }



  getByIdPRessource(idP: number): Observable<Object> {
    return this.http.get(`${this.url}/detail-projet-ptf-by-ressource/${idP}`);
  }



}
