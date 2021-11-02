import { Component, OnInit } from '@angular/core';
import { ProjetProgramme } from '../../../../../models/ProjetProgramme';
import { ConditionSuspensiveDecaissement } from '../../../../../models/ConditionSuspensiveDecaissement';
import { ConditionSuspensiveAccord } from '../../../../../models/ConditionSuspensiveAccord';
import { RessourceExterieure } from '../../../../../models/RessourceExterieure';
import { Localisation } from '../../../../../models/Localisation';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetProgrammeService } from '../../../../../services/projet-programme.service';

@Component({
  selector: 'app-detail-projet-idee',
  templateUrl: './detail-projet-idee.component.html',
  styleUrls: ['./detail-projet-idee.component.css']
})
export class DetailProjetIdeeComponent implements OnInit {

  projetSubmit: ProjetProgramme = null;

  paramKey: number;

  conditionSuspensiveDecaissementsList: Array<ConditionSuspensiveDecaissement> = [];
  conditionsuspensiveList: Array<ConditionSuspensiveAccord> = [];
  ressourcesExterieureList: Array<RessourceExterieure> = [];
  localisationList: Array<Localisation> = [];
  
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private projetProgrammeService: ProjetProgrammeService,) { }

    ngOnInit() {

      this.paramKey = this.activeRoute.snapshot.params['paramKey'];
  
      this.projetProgrammeService.getById(this.paramKey).subscribe(
        (data: ProjetProgramme) => {
          this.projetSubmit = data;
  
          console.log(this.projetSubmit);

        this.ressourcesExterieureList = data.ressourceExterieures;
        this.conditionsuspensiveList = data.conditionSuspensiveAccords;
        this.conditionSuspensiveDecaissementsList = data.conditionSuspensiveDecaissements;
        this.localisationList = data.localisations;

        console.log(this.ressourcesExterieureList);
        console.log(this.conditionsuspensiveList);
        console.log(this.conditionSuspensiveDecaissementsList);
        console.log(this.localisationList);
          
        });
  
    }

    gotoListFonds() {
      this.router.navigate(['admin/fonds-specifiques/list-fond-specifique']);
    }


    getTotalMontantRessourceExterieure(): number {
      let montantRessource: number = 0;
      this.ressourcesExterieureList.forEach(r => {
        montantRessource += r.montantRessourceProgrammer;
      });
      return montantRessource;
    }

}
