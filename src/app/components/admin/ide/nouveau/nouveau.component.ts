import { User } from './../../../../models/User';
import { Exercice } from './../../../../models/Exercice';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Commune } from 'src/app/models/Commune';
import { Arrondissement } from 'src/app/models/Arrondissement';
import { PaysService } from 'src/app/services/pays.service';
import { Router } from '@angular/router';
import { ExerciceService } from 'src/app/services/exercice.service';
import { SecteurService } from 'src/app/services/secteur.service';
import { DepartementService } from 'src/app/services/departement.service';
import { CommuneService } from 'src/app/services/commune.service';
import { ArrondissementService } from 'src/app/services/arrondissement.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Pays } from 'src/app/models/Pays';
import { Departement } from 'src/app/models/Departement';
import { Promoteur } from 'src/app/models/Promoteur';
import { Ide } from 'src/app/models/Ide';
import { ZoneLocalite } from 'src/app/models/ZoneLocalite';
import { ZoneLocaliteService } from 'src/app/services/zone-localite.service';
import { IdeService } from 'src/app/services/ide.service';
import { PromoteurService } from 'src/app/services/promoteur.service';
import { TokenStorage } from 'src/app/utils/token.storage';
import { HttpErrorResponse } from '@angular/common/http';
import { TypeCooperation } from 'src/app/models/TypeCooperation';
import { TypeCooperationService } from 'src/app/services/type-cooperation.service';
import { PrevisionRealisationIde } from './../../../../models/PrevisionRealisationIde';
import { Secteur } from './../../../../models/Secteur';
import { NzMessageService } from 'ng-zorro-antd';
import {DeviseMonaie} from "../../../../models/DeviseMonaie";
import {DeviseMonaieService} from "../../../../services/devise-monaie.service";

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.css']
})
export class NouveauComponent implements OnInit {
  montant = '';
  title = 'Le montant de ide';
  @ViewChild('inputElement', {static: false}) inputElement: ElementRef;
  validateForm: FormGroup;
  validateFormZone: FormGroup;
  validateFormPromoteur: FormGroup;
  validateFormPrevisionRealisation: FormGroup;
  typeNotificationTable: string;
  messageNotificationTable: string;
  isNotificationTable: boolean = false;

  previsionRealisationIde: PrevisionRealisationIde;

  user: User = null;
  filter: any;
  ide: Ide = null;

  departementList: Array<Departement> = [];
  communeList:  Array<Commune> = [];
  arrondissementList:  Array<Arrondissement> = [];
  zoneLocaliteList: Array<ZoneLocalite> = [];


  isVisiblePromoteur: boolean = false;
  isVisibleModalZone: boolean = false;
  isVisiblePrevisionRealisationew: boolean = false;
  isVisibleModalPromoteur: boolean = false;
  isVisibleModalListPromoteur: boolean = false;
  isVisibleModalPR: boolean = false;


  dataSet2 = [];
  res: any;
  optionsTy = ['PERSONNE PHYSIQUE', 'PERSONNE MORALE'];
  exerciceList: Array<Exercice> = [];
  deviseMonaieList: Array<DeviseMonaie> = [];
  typecooperationList: Array<TypeCooperation> = [];
  paysList: Array<Pays> = [];
  secteurList: Array<Secteur> = [];
  promoteurList: Array<Promoteur> = [];
  promoteurSubmit: Array<Promoteur> = [];
  zonesSubmit: Array<ZoneLocalite> = [];
  zonesList: Array<ZoneLocalite> = [];
  previsionRealisationSubmit: Array<PrevisionRealisationIde> = [];
  promoteur: Promoteur;

  constructor(
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
    private router: Router,
    private exerciceService: ExerciceService,
    private paysService: PaysService,
    private secteurService: SecteurService,
    private departementService: DepartementService,
    private communeService: CommuneService,
    private arrondissementService: ArrondissementService,
    private zoneLocaliteService: ZoneLocaliteService,
    private promoteurService: PromoteurService,
    private ideService: IdeService,
    private deviseMonaieService: DeviseMonaieService,
    private typecooperationService: TypeCooperationService,
    private notification: NzNotificationService,
    private tokenStorage: TokenStorage,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.listerZones();
    this.listerPromoteurs();
    //this.listerIdes();
    this.getDepartementList();
    this.getListAnnee();
    this.getListPays();
    this.getListSecteur();
    this.getListDevise();
    this.getListTypeCooperation();
    this.initformPromoteur();
    this.initformZOneLocalite();
    this.makeFormPrevisionRealisation(null);

    this.isVisiblePromoteur = false;
  }

  makeFormPrevisionRealisation(previsionRealisation: PrevisionRealisationIde): void {
    this.validateFormPrevisionRealisation = this.fb.group({
      montantTheorique: [null, [Validators.required]],
      annee: [null, [Validators.required,]],
      montantRealisation: [null, [Validators.required]],

    });
    this.previsionRealisationIde = previsionRealisation;
  }

  initialiseFormulaire(): void {
    this.validateForm.reset();
    this.promoteurSubmit = [];
    this.previsionRealisationSubmit = [];
    this.zonesSubmit = [];
  }

  makeForm(ide: Ide): void {
    this.validateForm = this.fb.group({
      anneeReception: [(ide != null) ? ide.anneeReception : null,
      [Validators.required]],
      montantTheorique: [(ide != null) ? ide.montantTheorique : null,
      [Validators.required]],
      montantDevise: [(ide != null) ? ide.montantDevise : null, [Validators.required,]],
      deviseMonnaie: [(ide != null) ? ide.deviseMonnaie : null, [Validators.required,]],
      typeCooperation: [(ide != null) ? ide.typeCooperation : null,
      [Validators.required]],
      secteur: [(ide != null) ? ide.secteur : null,
      [Validators.required]],
      libelle: [(ide != null) ? ide.libelle : null,
      [Validators.required]],
      observation: [(ide != null) ? ide.observation : null,
      [Validators.required]],
    });
    this.ide = ide;
  }

  getListAnnee(): void {
    this.exerciceService.list()
      .subscribe((data: Array<Exercice>) => {
        this.exerciceList = data;
        console.log(this.exerciceList);
      }, err => {
        console.log(err);
      });
  }

  getListPays(): void {
    this.paysService.list().subscribe(
      (data: Array<Pays>) => {
        this.paysList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  getListSecteur(): void {
    this.secteurService.list().subscribe(
      (data: Array<Secteur>) => {
        this.secteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
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



  getListTypeCooperation(): void {
    this.typecooperationService.list().subscribe(
      (data: Array<TypeCooperation>) => {
        this.typecooperationList = data;
        console.log(this.typecooperationList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }
  getDepartementList(): void {
    this.departementService.list()
      .subscribe((data: Array<Departement>) => {
        this.departementList = data;
      }, err => {
        console.log(err);
      });
  }

  communeChange(p: Commune): void {
    if (p != null) {
      this.arrondissementService.listParCommune(p.id)
        .subscribe((data: Array<Arrondissement>) => {
          this.arrondissementList = data;

        }, err => {
          console.log(err);
        });
    }
  }

  arrondissementChange(a: Arrondissement): void {
    if (a != null) {
      this.zoneLocaliteService.listParArrondissement(a.id)
        .subscribe((data: Array<ZoneLocalite>) => {
          this.zoneLocaliteList = data;

        }, err => {
          console.log(err);
        });
    }
  }

  departementChange(departement: Departement): void {
    if (departement != null) {
      this.communeService.listParDepartement(departement.id)
        .subscribe((data: Array<Commune>) => {
          this.communeList = data;
        }, err => {
          console.log(err);
        });
    }
  }
  showModalZone(): void {
    this.isVisibleModalZone = true;
  }
  handleCancelZoneLocalite() {
    console.log('Button ok clicked!');
    this.isVisibleModalZone = false;
  }
  showModalPromoteurNew() {
    this.isVisiblePromoteur = true;
  }

  showModalPromoteursList() {
    this.isVisibleModalListPromoteur = true;
  }
  showModalPrevisionRealisationNew() {
    this.isVisiblePrevisionRealisationew = true;
  }
  handleCancelPrevisionRealisationNew() {
    this.isVisiblePrevisionRealisationew = false;
  }
  showModalPrevisionRealisationList() {
    this.isVisibleModalPR = true;

  }
  handleCancelListPR() {
    this.isVisibleModalPR = false;
  }
  handleCancelPromoteur() {
    console.log('Button ok clicked!');
    this.isVisiblePromoteur = false;
  }
  handleCancelListPromoteur() {
    this.isVisibleModalListPromoteur = false;
  }

  notificationTable(type: string, msg: string) {
    this.typeNotificationTable = type;
    this.messageNotificationTable = msg;
    this.isNotificationTable = true;
  }
  closeNotificationTable() {
    this.isNotificationTable = false;
  }

  initformZOneLocalite() {
    this.validateFormZone = this.fb.group({
      departement: [null, [Validators.required]],
      commune: [null, [Validators.required]],
      arrondissement: [null],
      zoneLocalite: [null]
    });
  }

  initformPromoteur() {
    this.validateFormPromoteur = this.fb.group({
      nomcomplet: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      email: [null, [Validators.required]],
      type: [null, [Validators.required]],
      adresse: [null, [Validators.required]]
    });
  }

  listerZones() {
    this.zoneLocaliteService.list()
      .subscribe((data: Array<ZoneLocalite>) => {
        this.zonesList = data;
        console.log(this.zonesList);
      }, err => {
        console.log(err);
      });
  }

  listerPromoteurs() {
    this.promoteurService.list()
      .subscribe((data: Array<Promoteur>) => {
        this.promoteurList = data;
        console.log(this.promoteurList);
      }, err => {
        console.log(err);
      });
  }

  submitFormIde(): void {
    if (this.validateForm.valid && this.zonesSubmit.length > 0
      && this.promoteurSubmit.length > 0 && this.previsionRealisationSubmit.length > 0) {

      const formData = this.validateForm.value;
      console.log(formData);

      const ide = new Ide(
        null,
        formData.libelle,
        formData.montantTheorique,
        formData.observation,
        formData.anneeReception,
        formData.typeCooperation,
        this.zonesSubmit,
        formData.secteur,
        this.promoteurSubmit,
        this.previsionRealisationSubmit,
        this.user.username,
        null,
        null,
        formData.montantDevise,
        formData.deviseMonnaie

      );

      console.log(ide);

      this.ideService.save(ide).subscribe(
        (data: Ide) => {
          console.log(data);
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> L\'investissement direct étranger a été enregistré avec succès avec la référence <strong>' + data.libelle +
              '</strong></p>',
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

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  submitFormZone(): void {
    /* const localite = {
      id: null,
      libelle: this.validateFormZone.value.zoneLocalite.libelle,
      arrondissement: this.validateFormZone.value.arrondissement
    }; */

    const localite = this.validateFormZone.value.zoneLocalite;
    console.log(localite);

    /* this.zoneLocaliteService.save(localite)
      .subscribe((res: ZoneLocalite) => { */

        this.validateFormZone.reset();
        this.zonesList.unshift(localite);
        this.zonesSubmit.unshift(localite);
     /*  },
        err => {
          console.log(err);
        }); */
  }

  deleteZone(z: ZoneLocalite): void {
    this.zoneLocaliteService.delete(z)
      .subscribe((res: ZoneLocalite) => {

        this.validateFormZone.reset();
        this.zonesList.splice(this.indexOfElement(z.id, this.zonesList), 1);
        this.zonesSubmit.splice(this.indexOfElement(z.id, this.zonesSubmit), 1);
      },
        err => {
          console.log(err);
        });
  }

  choisirZone(z: ZoneLocalite): void {
    let i = this.indexOfElement(z.id, this.zonesSubmit);
    this.zonesSubmit.unshift(z);
  }

  enleverZone(z: ZoneLocalite): void {
    this.zonesSubmit.splice(this.indexOfElement(z.id, this.zonesSubmit), 1);
  }
  submitFormPromoteur(): void {
    const promoteur = {
      id: null,
      nomcomplet: this.validateFormPromoteur.value.nomcomplet,
      tel: this.validateFormPromoteur.value.tel,
      email: this.validateFormPromoteur.value.email,
      type: this.validateFormPromoteur.value.type,
      adresse: this.validateFormPromoteur.value.adresse,
      anneeCreation: null
    };
    console.log(promoteur);

    this.promoteurService.save(promoteur)
      .subscribe((res: Promoteur) => {

        this.validateFormPromoteur.reset();
        //this.promoteurList.unshift(res);
        this.promoteurSubmit.unshift(res);
      },
        err => {
          console.log(err);
        });
  }

  deletePromoteur(p: Promoteur) {

    this.promoteurSubmit.splice(this.indexOfElement(p.id, this.promoteurSubmit), 1);

  }
  choisirPromoteur(p: Promoteur) {
    if (this.indexOfElement(p.id, this.promoteurSubmit) === -1) {
      this.promoteurSubmit.unshift(p);
    }
  }

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


  enleverPromoteur(p: Promoteur): void {
    this.promoteurSubmit.splice(this.indexOfElement(p.id, this.promoteurSubmit), 1);
  }


  checkDoublonElement(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.promoteurList.length && rep === false) {
      if (this.promoteurList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  enregistrerPrevisionRealisation(): void {
    if (this.validateFormPrevisionRealisation.invalid) {
      this.modalService.error({
        nzTitle: 'Erreur',
        nzContent: '<p> Les informations sont invalides pour l\'enregistrement de la Prévivion Réalisation.</p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => console.log('cancel')
      });
    } else {
      const formData = this.validateFormPrevisionRealisation.value;
      let previsionRealisation = new PrevisionRealisationIde(null, formData.annee, formData.montantTheorique, formData.montantRealisation,
        this.user.username, null);

      if (this.checkDoublonElementprevisionRealisation(previsionRealisation) === true) {
        this.modalService.error({
          nzTitle: 'Erreur',
          nzContent: '<p> Année déjà définie.</p>',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => console.log('cancel')
        });
      } else {
        this.modalService.success({
          nzTitle: 'Succès',
          nzContent: '<p> Ajouter avec succès.</p>',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => console.log('cancel')
        });
        this.previsionRealisationSubmit.unshift(previsionRealisation);
        this.validateFormPrevisionRealisation.reset();
      }
      this.handleCancelPrevisionRealisationNew();
    }
  }

  enleverPrevivionRealisation(p: PrevisionRealisationIde): void {
    this.previsionRealisationSubmit.splice(this.indexOfElement(p.id, this.previsionRealisationSubmit), 1);
  }


  checkDoublonElementprevisionRealisation(previsionRealisationIde: PrevisionRealisationIde): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.previsionRealisationSubmit.length && rep === false) {
      if (this.previsionRealisationSubmit[i].annee.id === previsionRealisationIde.annee.id) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

}
