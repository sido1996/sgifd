import { Component, OnInit } from '@angular/core';
import { Ptf } from '../../../../models/Ptf';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Exercice } from '../../../../models/Exercice';
import { User } from '../../../../models/User';
import { Router } from '@angular/router';
import { ExerciceService } from '../../../../services/exercice.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TokenStorage } from '../../../../utils/token.storage';
import { PPP } from '../../../../models/PPP';
import { PPPService } from '../../../../services/ppp.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Promoteur } from '../../../../models/Promoteur';
import { ProjetProgramme } from '../../../../models/ProjetProgramme';
import { TypeCooperation } from '../../../../models/TypeCooperation';
import { PrevisionRealisationPPP } from '../../../../models/PrevisionRealisationPPP';
import { PromoteurService } from '../../../../services/promoteur.service';
import { TypeCooperationService } from '../../../../services/type-cooperation.service';
import { ProjetProgrammeService } from '../../../../services/projet-programme.service';
import {DeviseMonaie} from '../../../../models/DeviseMonaie';
import {DeviseMonaieService} from '../../../../services/devise-monaie.service';

@Component({
  selector: 'app-nouveau-ppp',
  templateUrl: './nouveau-ppp.component.html',
  styleUrls: ['./nouveau-ppp.component.css']
})
export class NouveauPppComponent implements OnInit {

  validateFormPrevivionRealisation: FormGroup;
  validateFormPPP: FormGroup;

  exerciceList: Array<Exercice> = [];
  deviseMonaieList: Array<DeviseMonaie> = [];
  promoteurList: Array<Promoteur> = [];
  projetList: Array<ProjetProgramme> = [];
  typeCooperationList: Array<TypeCooperation> = [];

  isVisibleModalPromoteurList: boolean = false;
  isVisibleModalProjetList: boolean = false;
  isVisibleModalPrevivionRealisationNew: boolean = false;
  btnFermerText: string = 'Fermer';

  selectedValue: string = '';

  user: User = null;
  filter: any;
  filter2: any;


  promoteursSubmit: Array<Promoteur> = [];
  projetSubmit: ProjetProgramme = null;
  previvionRealisationSubmit: Array<PrevisionRealisationPPP> = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private promoteurService: PromoteurService,
    private exerciceService: ExerciceService,
    private deviseMonaieService: DeviseMonaieService,
    private typecooperationService: TypeCooperationService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private projetProgrammeService: ProjetProgrammeService,
    private pppService: PPPService,
    private tokenStorage: TokenStorage, ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getListPromoteur();
    this.getListExercice();
    this.getListTypeCoopration();
    this.getListProjet();
    this.getListDevise();

    this.makeFormPPP();
    this.makeFormPrevivionRealisation();

  }


  /* enregistrement d'un fon spécifique */
  enregistrerPPP(): void {
    if (this.validateFormPPP.valid && this.projetSubmit != null
      && this.promoteursSubmit.length > 0 && this.previvionRealisationSubmit.length > 0) {

      const formData = this.validateFormPPP.value;
      console.log(formData);

      const ppp = new PPP(
        null,
        formData.categorie,
        formData.anneePartenariat,
        this.projetSubmit,
        formData.libelle,
        formData.observations,
        formData.typeCooperation,
        formData.montantTheorique,
        null,
        this.promoteursSubmit,
        this.previvionRealisationSubmit,
        this.user.username,
        null,
        formData.montantDevise,
        formData.deviseMonnaie
      );

      console.log(ppp);

      this.pppService.save(ppp).subscribe(
        (data: PPP) => {
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> Le ppp intitulé <strong>' + data.libelle +
              '</strong> de montant global theorique <strong>' + data.montantTheorique + ' francs CFA </strong> a été ' +
              'enregistré avec succès.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => this.initialiseFormulaire()
          });
        },
        (error: HttpErrorResponse) => {
          this.createMessage('danger', 'Echec de l\'enregistrement du projet !');
        });
    } else {

    }
  }

  initialiseFormulaire(): void {
    this.validateFormPPP.reset();
    this.validateFormPrevivionRealisation.reset();
    this.promoteursSubmit = [];
    this.previvionRealisationSubmit = [];
    this.projetSubmit = null;
    this.handleCancel()
  }

  /*fin enregistrement*/


  choisirUnPromoteur(p): void {
    if (this.indexOfElement(p.id, this.promoteursSubmit) == -1) {
      this.promoteursSubmit.unshift(p);
    }
  }


  enleverPromoteur(p): void {
    this.promoteursSubmit.splice(this.indexOfElement(p.id, this.promoteursSubmit), 1);
  }


  showModalPromoteurList(): void {
    this.isVisibleModalPromoteurList = true;
  }



  showModalProjetList(): void {
    this.isVisibleModalProjetList = true;
  }

  errorProjet(): void {
    this.projetSubmit = null;
  }

  choisirUnProjet(p: ProjetProgramme): void {
    this.projetSubmit = p;
  }




  showModalPrevivionRealisationNew(): void {
    this.isVisibleModalPrevivionRealisationNew = true;
  }



  enleverPrevivionRealisation(p: PrevisionRealisationPPP): void {
    this.previvionRealisationSubmit.splice(this.indexOfElement(p.id, this.previvionRealisationSubmit), 1);
  }




  handleCancel(): void {
    this.isVisibleModalPromoteurList = false;
    this.isVisibleModalProjetList = false;
    this.isVisibleModalPrevivionRealisationNew = false;
  }


  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }


  /*Réalisation des formulaires*/

  makeFormPPP(): void {
    this.validateFormPPP = this.fb.group({
      categorie: [null, [Validators.required,]],
      anneePartenariat: [null, [Validators.required,]],
      libelle: [null, [Validators.required,]],
      observations: [null],
      typeCooperation: [null, [Validators.required,]],
      montantTheorique: [null, [Validators.required,]],
      montantDevise: [ null, [Validators.required,]],
      deviseMonnaie: [ null, [Validators.required,]],
    });
  }


  makeFormPrevivionRealisation(): void {
    this.validateFormPrevivionRealisation = this.fb.group({
      annee: [null, [Validators.required,]],
      montantTheorique: [null, [Validators.required,]],
      montantRealisation: [null, [Validators.required,]],
    });
  }

  /* fin formulaires */




  enregistrerPrevivionRealisation(): void {
    if (this.validateFormPrevivionRealisation.invalid) {
      this.modalService.error({
        nzTitle: 'Erreur',
        nzContent: '<p> Les informations sont invalides pour l\'enregistrement de la Prévivion Réalisation.</p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => console.log('cancel')
      });
    } else {
      const formData = this.validateFormPrevivionRealisation.value;
      let previvionRealisation = new PrevisionRealisationPPP(null, formData.annee, formData.montantTheorique, formData.montantRealisation, this.user.username,
        null);
      console.log(previvionRealisation);


    if (this.checkDoublonElementPrevivionRealisation(previvionRealisation) === true) {
      this.modalService.error({
        nzTitle: 'Erreur',
        nzContent: '<p> Année déjà définie.</p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => console.log('cancel')
      });
    }else {
      this.previvionRealisationSubmit.unshift(previvionRealisation);
      this.validateFormPrevivionRealisation.reset();
    }


      this.handleCancel();
    }
  }

  /*début obtention des listes */
  getListPromoteur(): void {
    this.promoteurService.list().subscribe(
      (data: Array<Promoteur>) => {
        this.promoteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  getListExercice(): void {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }
  getListDevise(): void {
    this.deviseMonaieService.list().subscribe(
      (data: Array<DeviseMonaie>) => {
        this.deviseMonaieList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  getListTypeCoopration(): void {
    this.typecooperationService.list().subscribe(
      (data: Array<TypeCooperation>) => {
        this.typeCooperationList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListProjet(): void {
    this.projetProgrammeService.listGlobal().subscribe(
      (data: Array<ProjetProgramme>) => {
        this.projetList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  /* fin des listes */

  indexOfElement(id: number, listElement: Array<any>): number {
    let index = -1;
    let rep: boolean = false;
    let i = 0;
    while (i < listElement.length && rep === false) {
      if (listElement[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }


  checkDoublonElementPrevivionRealisation(previsionRealisationPPP: PrevisionRealisationPPP): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.previvionRealisationSubmit.length && rep === false) {
      if (this.previvionRealisationSubmit[i].annee === previsionRealisationPPP.annee) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

  // Debut méthode format monnetaire
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire



  /* action sur les changements de zones */


}
