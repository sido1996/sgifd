import { Component, OnInit } from '@angular/core';
import { Ptf } from '../../../../models/Ptf';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Structure } from '../../../../models/Structure';
import { ProjetIdee } from '../../../../models/ProjetIdee';
import { Exercice } from '../../../../models/Exercice';
import { Secteur } from '../../../../models/Secteur';
import { DomainePTF } from '../../../../models/DomainePTF';
import { NiveauMaturite } from '../../../../models/NiveauMaturite';
import { ZoneLocalite } from '../../../../models/ZoneLocalite';
import { Pays } from '../../../../models/Pays';
import { TypeFondSpecifique } from '../../../../models/TypeFondSpecifique';
import { User } from '../../../../models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetideeService } from '../../../../services/projetidee.service';
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
import { FindValues } from '../../../../payload/FindValues';
import { PrevisionRealisationPPPService } from '../../../../services/previsionRealisationPPP.service';
import {DeviseMonaieService} from "../../../../services/devise-monaie.service";
import {DeviseMonaie} from "../../../../models/DeviseMonaie";

@Component({
  selector: 'app-modifier-ppp',
  templateUrl: './modifier-ppp.component.html',
  styleUrls: ['./modifier-ppp.component.css']
})
export class ModifierPppComponent implements OnInit {

  validateFormPrevivionRealisation: FormGroup;
  validateFormPPP: FormGroup;

  exerciceList: Array<Exercice> = [];
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

  paramKey: number;


  promoteursSubmit: Array<Promoteur> = [];
  deviseMonaieList: Array<DeviseMonaie> = [];
  pppSubmit: PPP = null;
  projetSubmit: ProjetProgramme = null;
  previvionRealisationSubmit: Array<PrevisionRealisationPPP> = [];

  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
    private router: Router,
    private promoteurService: PromoteurService,
    private exerciceService: ExerciceService,
    private deviseMonaieService: DeviseMonaieService,
    private previsionRealisationPPPService: PrevisionRealisationPPPService,
    private  activeRoute: ActivatedRoute,
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
    this.makeFormPrevivionRealisation();

    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    this.makeFormPPP();

    this.pppService.getById(this.paramKey).subscribe(
      (data: PPP) => {
        this.pppSubmit = data;
        this.projetSubmit = data.projetProgrammeIdee;
        this.promoteursSubmit= data.promoteurs;
        this.previvionRealisationSubmit = data.previsionRealisationPPPs

console.log(this.previvionRealisationSubmit);

        this.selectedValue = this.pppSubmit.categorie;
        this.makeFormPPP()
      });

  }



  /* enregistrement d'un fon spécifique */
  modificationPPP(): void {
    if (this.validateFormPPP.valid && this.projetSubmit != null
      && this.promoteursSubmit.length > 0 && this.previvionRealisationSubmit.length > 0) {

      const formData = this.validateFormPPP.value;
      console.log(formData);

      this.pppSubmit.categorie = formData.categorie;
      this.pppSubmit.anneePartenariat = this.findValues.getObjectInList(formData.anneePartenariat, this.exerciceList);
      this.pppSubmit.projetProgrammeIdee =  this.projetSubmit;
      this.pppSubmit.libelle = formData.libelle;
      this.pppSubmit.observations = formData.observations;
      this.pppSubmit.typeCooperation = this.findValues.getObjectInList(formData.typeCooperation, this.typeCooperationList);
      this.pppSubmit.montantTheorique = formData.montantTheorique;
      this.pppSubmit.montantDevise = formData.montantDevise;
      this.pppSubmit.deviseMonnaie = this.findValues.getObjectInList(formData.deviseMonnaie, this.deviseMonaieList);

      this.pppSubmit.promoteurs =  this.promoteursSubmit;
      this.pppSubmit.previsionRealisationPPPs = this.previvionRealisationSubmit;
      this.pppSubmit.createBy =  this.user.username;
      // );

      this.pppService.save(this.pppSubmit).subscribe(
        (data: PPP) => {
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> Le PPP nommé. <strong>' + data.libelle +
              '</strong> pour un montant global theorique de <strong>' + data.montantTheorique + ' francs CFA</strong> a été ' +
              'modifié avec succès.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => this.initialiseFormulaire()
          });
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('danger', 'Echec de l\'enregistrement du projet !');
        });
    } else {

    }
  }

  initialiseFormulaire(): void {
    this.router.navigate(['admin/ppp/list-ppp/']);
  }

  /*fin enregistrement*/

  /* choisir le ptf et la structure bénéficiaire*/







  confirmerSuppressionPrevisionRealisationPPP(p: PrevisionRealisationPPP): void {
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression?</p>',
      nzOkText: 'Oui',
      nzCancelText: 'Non',
      nzOnOk: () => this.supprimerPrevivionRealisation(p),
      nzOnCancel: () => console.log('cancel')
    });
  }

  supprimerPrevivionRealisation(p: PrevisionRealisationPPP): void {
    this.previsionRealisationPPPService.delete(p).subscribe(
      (data: boolean) => {
        this.previvionRealisationSubmit.splice(this.indexOfElement(p.id, this.previvionRealisationSubmit), 1);
      },
      (error: HttpErrorResponse) => {
        //   this.router.navigate(['dashboard']);
        this.createMessage('danger', 'Echec de supression du projet !');
      });
  }




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



  /* enleverPrevivionRealisation(p: PrevisionRealisationPPP): void {
    this.previvionRealisationSubmit.splice(this.indexOfElement(p.id, this.previvionRealisationSubmit), 1);
  } */




  handleCancel(): void {
    this.isVisibleModalPromoteurList = false;
    this.isVisibleModalProjetList = false;
    this.isVisibleModalPrevivionRealisationNew = false;
  }


  makeFormPrevivionRealisation(): void {
    this.validateFormPrevivionRealisation = this.fb.group({
      annee: [null, [Validators.required,]],
      montantTheorique: [null, [Validators.required,]],
      montantRealisation: [null, [Validators.required,]],
    });
  }




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

  getListDevise(): void {
    this.deviseMonaieService.list().subscribe(
      (data: Array<DeviseMonaie>) => {
        this.deviseMonaieList = data;
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
    this.projetProgrammeService.list().subscribe(
      (data: Array<ProjetProgramme>) => {
        this.projetList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }







  /* fin des actions sur les projets */

  /*Réalisation des formulaires*/
  makeFormPPP(): void {
    //console.log(this.findValues.getArrayId(this.pppSubmit.domaines));
    this.validateFormPPP = this.fb.group({
      categorie: [this.pppSubmit != null ? this.pppSubmit.categorie: null,
        [Validators.required,]],
      anneePartenariat: [this.pppSubmit != null ? this.pppSubmit.anneePartenariat.id: null,
        [Validators.required,]],
      libelle: [this.pppSubmit != null ? this.pppSubmit.libelle: null,
          [Validators.required,]],
      observations: [this.pppSubmit != null ? this.pppSubmit.observations: null,
        [Validators.required,]],
      typeCooperation: [this.pppSubmit != null ? this.pppSubmit.typeCooperation.id: null,
          [Validators.required,]],
      montantDevise: [(this.pppSubmit != null) ? this.pppSubmit.montantDevise : null,
        [Validators.required,]],

      deviseMonnaie: [(this.pppSubmit != null) ? this.pppSubmit.deviseMonnaie.id : null,
        [Validators.required,]],
      montantTheorique: [this.pppSubmit != null ? this.pppSubmit.montantTheorique: null,
        [Validators.required,]],
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

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
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

  gotoListPPP() {
    this.router.navigate(['admin/ppp/list-ppp']);
  }
}
