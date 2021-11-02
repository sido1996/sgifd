import { Component, OnInit } from '@angular/core';
import { Ptf } from '../../../../models/Ptf';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ProjetIdee } from '../../../../models/ProjetIdee';
import { DomainePTF } from '../../../../models/DomainePTF';
import { Pays } from '../../../../models/Pays';
import { User } from '../../../../models/User';
import { Router } from '@angular/router';
import { ProjetideeService } from '../../../../services/projetidee.service';
import { PtfService } from '../../../../services/ptf.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { SecteurService } from '../../../../services/secteur.service';
import { DomainePtfService } from '../../../../services/domaine-ptf.service';
import { PaysService } from '../../../../services/pays.service';
import { TokenStorage } from '../../../../utils/token.storage';
import { HttpErrorResponse } from '@angular/common/http';
import { AxePrioritaire } from '../../../../models/AxePrioritaire';
import { SousSecteurService } from '../../../../services/sous-secteur.service';
import { CommissionMixteDspService } from '../../../../services/commission-mixte-dsp.service';
import { SousSecteur } from '../../../../models/SousSecteur';
import { AxePrioritaireService } from '../../../../services/axe-prioritaire.service';
import { ObjectifODD } from '../../../../models/ObjectifODD';
import { ObjectifOddService } from '../../../../services/objectif-odd.service';
import { DeviseMonaieService } from '../../../../services/devise-monaie.service';
import { DeviseMonaie } from '../../../../models/DeviseMonaie';
import { AxePrioritaireCommission } from '../../../../models/AxePrioritaireCommission';
import { FindValues } from '../../../../payload/FindValues';
import {CommissionMixteDsp} from "../../../../models/CommissionMixteDsp";

@Component({
  selector: 'app-nouveau-commission-mixte-dsp',
  templateUrl: './nouveau-commission-mixte-dsp.component.html',
  styleUrls: ['./nouveau-commission-mixte-dsp.component.css']
})
export class NouveauCommissionMixteDspComponent implements OnInit {

  validateFormCommissionMixteDsp: FormGroup;
  validateFormAxe: FormGroup;

  indexAxePrioritaire: number;
  ptfList: Array<Ptf> = [];
  projetideeList: Array<ProjetIdee> = [];
  sousSecteurList: Array<SousSecteur> = [];
  domaineList: Array<DomainePTF> = [];
  deviseMonaieList: Array<DeviseMonaie> = [];
  axesPrioritaireList: Array<AxePrioritaire> = [];
  oddList: Array<ObjectifODD> = [];

  isVisibleModalProjetList: boolean = false;
  isVisibleModalZone: boolean = false;
  btnFermerText: string = 'Fermer';
  private findValues: FindValues = new FindValues();

  nombreAxes: number = null;

  user: User = null;
  filter: any;

  projetIdeesSubmit: Array<ProjetIdee> = [];
  axePrioritaireSubmit: Array<AxePrioritaireCommission> = [];
  axePrioritaire: AxePrioritaireCommission;

  constructor(private fb: FormBuilder,
    private router: Router,
    private projetideeService: ProjetideeService,
    private ptfService: PtfService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private secteurService: SecteurService,
    private sousSecteurService: SousSecteurService,
    private DomainePTFService: DomainePtfService,
    private axePrioritaireService: AxePrioritaireService,
    private paysService: PaysService,
    private oddService: ObjectifOddService,
    private deviseMonaieService: DeviseMonaieService,
    private commissionMixteDspService: CommissionMixteDspService,
    private tokenStorage: TokenStorage, ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getListDomaines();
    this.getListProjetIdee();
    this.getListPTF();
    this.getListSousSecteurs();
    this.getListAxePrioritaire();
    this.getListOdd();
    this.getListDevise();

    this.makeFormAxe();

    this.makeFormCommissionMixteDsp();

  }


  /* enregistrement d'un fon spécifique */
  enregistrerCommissionMixteDsp(): void {
    if (this.validateFormCommissionMixteDsp.valid && this.projetIdeesSubmit.length > 0) {

      const formData = this.validateFormCommissionMixteDsp.value;
      console.log(formData);

      const commissionMixteDsp = new CommissionMixteDsp(
        null,
        formData.institutionsPtf,
        formData.dateApprobation,
        formData.dateOrAnneeDebutPeriode,
        formData.dateOrAnneeFinPeriode,
        formData.periodicite,
        formData.lieuDerniereCommission,
        null,
        null,
        formData.sousSecteurs,
        formData.odd,
        formData.montantPrevisionnelDevise,
        formData.deviseMonnaie,
        formData.montantPrevisionnelFcfa,
        formData.obligations,
        formData.recommandation,
        this.axePrioritaireSubmit,
        this.projetIdeesSubmit,
        this.user.username,
        null
      );

      console.log(commissionMixteDsp);

      this.commissionMixteDspService.save(commissionMixteDsp).subscribe(
        (data: CommissionMixteDsp) => {
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> La commission Mixte Dsp,  <strong>' + data.libelle +
              '</strong> de montant prévisionnel <strong>' + data.montantPrevisionnelFcfa + ' francs CFA </strong> a été ' +
              'enregistré avec succès.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => this.initialiseFormulaire()
          });
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('danger', 'Echec de l\'enregistrement de la Commission Mixte Dsp !');
        });
    } else {

    }
  }

  initialiseFormulaire(): void {
    this.validateFormCommissionMixteDsp.reset();
    this.projetIdeesSubmit = [];
    this.isVisibleModalProjetList = false;
  }


  handleCancel(): void {
    this.isVisibleModalProjetList = false;
  }

  /*fin enregistrement*/



  /* fin des choix*/

  /* les actions sur les projets jusqu'à l'enregistrement d'un nouveau projet */


  showModalProjetList(): void {
    this.isVisibleModalProjetList = true;
  }




  /* fin des actions sur les projets */

  /*Réalisation des formulaires*/
  makeFormCommissionMixteDsp(): void {
    this.validateFormCommissionMixteDsp = this.fb.group({
      institutionsPtf: [null, [Validators.required,]],
      dateApprobation: [null, [Validators.required,]],
      dateOrAnneeDebutPeriode: [null, [Validators.required,]],
      dateOrAnneeFinPeriode: [null, [Validators.required,]],
      periodicite: [null, [Validators.required,]],
      lieuDerniereCommission: [null, [Validators.required,]],
      libelle: [null,],
      domaines: [null,],
      sousSecteurs: [null, [Validators.required,]],
      odd: [null, [Validators.required,]],
      montantPrevisionnelDevise: [null, [Validators.required,]],
      deviseMonnaie: [null, [Validators.required,]],
      montantPrevisionnelFcfa: [null, [Validators.required,]],
      obligations: [null,],
      recommandation: [null,],
    });
  }
  makeFormAxe(): void {
    this.validateFormAxe = this.fb.group({
      libelle: [this.axePrioritaire != null ? this.axePrioritaire.libelle : null,
      [Validators.required,]],
      montantPrevisionnelDevise: [this.axePrioritaire != null ? this.axePrioritaire.montantPrevisionnelDevise : null,
      [Validators.required,]],
      deviseMonnaie: [this.axePrioritaire != null ? this.axePrioritaire.deviseMonnaie.id : null,
      [Validators.required,]],
      montantPrevisionnelFcfa: [this.axePrioritaire != null ? this.axePrioritaire.montantPrevisionnelFcfa : null,
      [Validators.required,]],
    });
  }

  /* fin formulaires */

  /*début obtention des listes */


  getListPTF(): void {
    this.ptfService.list().subscribe(
      (data: Array<Ptf>) => {
        this.ptfList = data;
        console.log(this.ptfList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListDomaines(): void {
    this.DomainePTFService.list().subscribe(
      (data: Array<DomainePTF>) => {
        this.domaineList = data;
        console.log(this.domaineList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListProjetIdee(): void {
    this.projetideeService.listGlobal().subscribe(
      (data: Array<ProjetIdee>) => {
        this.projetideeList = data;
        console.log(this.projetideeList)
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

  getListSousSecteurs() {
    this.sousSecteurService.list().subscribe(
      (data: Array<SousSecteur>) => {
        this.sousSecteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListAxePrioritaire() {
    this.axePrioritaireService.list().subscribe(
      (data: Array<AxePrioritaire>) => {
        this.axesPrioritaireList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListOdd() {
    this.oddService.list().subscribe(
      (data: Array<ObjectifODD>) => {
        this.oddList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  ajouterAxe(axe: AxePrioritaireCommission) {
    if (this.validateFormAxe.valid) {
      /* let i = this.indexOfElement(axe.id, this.axePrioritaireSubmit);
       this.axePrioritaireSubmit.splice(i, i > -1 ? 1: 0);*/
      this.axePrioritaireSubmit.unshift(axe);
      this.validateFormAxe.reset();
    } else {
      this.modalService.error({
        nzTitle: 'Erreur',
        nzContent: '<p> Echec.</p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => console.log(),
      });
    }

  }


  annulerSelection(): void {
    this.axePrioritaire = null;
    this.makeFormAxe();
  }

  selectionnerAxe(axe: AxePrioritaireCommission): void {
    this.axePrioritaire = axe;
    this.makeFormAxe();
  }

  enleverAxe(a: AxePrioritaireCommission) {
    this.axePrioritaireSubmit.splice(this.indexOfElement(a.id, this.axePrioritaireSubmit), 1);
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


  /* action sur les changements de zones */

  calculNombreAxes(elt: Array<any>): void {
    this.nombreAxes = (elt != null) ? elt.length : 0;
  }

  enregistrerAxe() {


    if (this.validateFormAxe.valid) {
      const formData = this.validateFormAxe.value;
      const axe: AxePrioritaireCommission = new AxePrioritaireCommission(null, formData.libelle,
        formData.montantPrevisionnelDevise, this.findValues.getObjectInList(formData.deviseMonnaie, this.deviseMonaieList),
        formData.montantPrevisionnelFcfa, this.user.username, null)

      this.axePrioritaireSubmit.splice(this.indexAxePrioritaire, this.indexAxePrioritaire > -1 ? 1 : 0);


      this.axePrioritaireSubmit.unshift(axe);
      this.validateFormAxe.reset();
      this.indexAxePrioritaire = -1;
    } else {
      this.modalService.error({
        nzTitle: 'Erreur',
        nzContent: '<p> Echec.</p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => console.log(),
      });
    }

  }

  choisirProjetIdee(p: ProjetIdee): void {
    let i = this.indexOfElement(p.id, this.projetIdeesSubmit);
    this.projetIdeesSubmit.splice(i, i > -1 ? 1 : 0);
    this.projetIdeesSubmit.unshift(p);

  }

  enleverProjetIdee(p: ProjetIdee): void {
    this.projetIdeesSubmit.splice(this.indexOfElement(p.id, this.projetIdeesSubmit), 1);
  }
  // Debut méthode format monnetaire
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire

}
