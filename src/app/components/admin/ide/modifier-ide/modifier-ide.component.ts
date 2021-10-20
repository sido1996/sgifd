import {ZoneLocalite} from './../../../../models/ZoneLocalite';
import {Arrondissement} from './../../../../models/Arrondissement';
import {Commune} from './../../../../models/Commune';
import {Departement} from './../../../../models/Departement';
import {ArrondissementService} from './../../../../services/arrondissement.service';
import {ZoneLocaliteService} from './../../../../services/zone-localite.service';
import {DepartementService} from './../../../../services/departement.service';
import {CommuneService} from './../../../../services/commune.service';
import {SecteurService} from './../../../../services/secteur.service';
import {Ide} from './../../../../models/Ide';
import {User} from './../../../../models/User';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {IdeService} from 'src/app/services/ide.service';
import {ExerciceService} from 'src/app/services/exercice.service';
import {PaysService} from 'src/app/services/pays.service';
import {Pays} from 'src/app/models/Pays';
import {Exercice} from 'src/app/models/Exercice';
import {Secteur} from 'src/app/models/Secteur';
import {PromoteurService} from "../../../../services/promoteur.service";
import {NzModalService, NzNotificationService, NzMessageService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {FindValues} from "../../../../payload/FindValues";
import {TypeCooperation} from 'src/app/models/TypeCooperation';
import {TypeCooperationService} from 'src/app/services/type-cooperation.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Promoteur} from 'src/app/models/Promoteur';
import {PrevisionRealisationIde} from "../../../../models/PrevisionRealisationIde";
import {DeviseMonaie} from "../../../../models/DeviseMonaie";
import {DeviseMonaieService} from "../../../../services/devise-monaie.service";
import {PrevisionRealisationPPP} from "../../../../models/PrevisionRealisationPPP";
import {PrevisionRealisationIdeService} from "../../../../services/previsionRealisationIde.service";

@Component({
  selector: 'app-modifier-ide',
  templateUrl: './modifier-ide.component.html',
  styleUrls: ['./modifier-ide.component.css']
})
export class ModifierIdeComponent implements OnInit {
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


  zoneLocaliteList: Array<ZoneLocalite> = [];

  user: User = null;
  filter: any;
  index: any;
  i = 3;
  Aprom: boolean = false;
  ide: Ide = null;

  departementList: any;
  communeList: any;
  arrondissementList: any;


  isVisiblePromoteur: boolean = false;
  isVisibleModalZone: boolean = false;
  isVisiblePrevisionRealisationew: boolean = false;
  isVisibleModalPromoteur: boolean = false;
  isVisibleModalListPromoteur: boolean = false;
  isVisibleModalPR: boolean = false;
  paramKey: number;
  ideSubmit: Ide = null;
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
  private findValues: FindValues = new FindValues();

  constructor(
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
    private router: Router,
    private exerciceService: ExerciceService,
    private paysService: PaysService,
    private activeRoute: ActivatedRoute,
    private secteurService: SecteurService,
    private departementService: DepartementService,
    private communeService: CommuneService,
    private deviseMonaieService: DeviseMonaieService,
    private arrondissementService: ArrondissementService,
    private zoneLocaliteService: ZoneLocaliteService,
    private promoteurService: PromoteurService,
    private ideService: IdeService,
    private typecooperationService: TypeCooperationService,
    private previsionRealisationIdeServivice: PrevisionRealisationIdeService,
    private notification: NzNotificationService,
    private tokenStorage: TokenStorage,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.listerZones();
    this.listerPromoteurs();
    //this.listerIdes();
    this.getDepartementList();
    this.getListAnnee();
    this.getListPays();
    this.getListDevise();
    this.getListSecteur();
    this.getListTypeCooperation();
    this.initformPromoteur();
    this.initformZOneLocalite();
    this.makeFormPrevisionRealisation(null);
    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    this.makeForm();
    this.ideService.getById(this.paramKey).subscribe(
      (data: Ide) => {
        this.ideSubmit = data;
        this.promoteurSubmit = data.promoteurs;
        this.zonesSubmit = data.zone;
        if(data.previsionRealisationIdes != null) {
          this.previsionRealisationSubmit = data.previsionRealisationIdes;
        }
        this.makeForm();
      });
  }

  makeFormPrevisionRealisation(previsionRealisation: PrevisionRealisationIde): void {
    this.validateFormPrevisionRealisation = this.fb.group({
      montantTheorique: [null, [Validators.required]],
      annee: [null, [Validators.required,]],
      montantRealisation: [null, [Validators.required]],

    });
    this.previsionRealisationIde = previsionRealisation;
  }

  makeForm(): void {
    this.validateForm = this.fb.group({

      anneeReception: [(this.ideSubmit != null && this.ideSubmit.anneeReception != null) ? this.ideSubmit.anneeReception.id : null,
        [Validators.required]],
      montantTheorique: [(this.ideSubmit != null) ? this.ideSubmit.montantTheorique : null,
        [Validators.required]],
      montantDevise: [(this.ideSubmit != null) ? this.ideSubmit.montantDevise : null,
        [Validators.required,]],
      deviseMonnaie: [(this.ideSubmit != null && this.ideSubmit.deviseMonnaie != null) ? this.ideSubmit.deviseMonnaie.id : null,
        [Validators.required,]],
      typeCooperation: [(this.ideSubmit != null && this.ideSubmit.typeCooperation != null) ? this.ideSubmit.typeCooperation.id : null,
        [Validators.required]],
      secteur: [(this.ideSubmit != null && this.ideSubmit.secteur != null) ? this.findValues.getArrayId(this.ideSubmit.secteur) : null,
        [Validators.required]],
      libelle: [(this.ideSubmit != null) ? this.ideSubmit.libelle : null,
        [Validators.required]],
      observation: [(this.ideSubmit != null) ? this.ideSubmit.observation : null,
        [Validators.required]],
    });
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

  getListDevise(): void {
    this.deviseMonaieService.list().subscribe(
      (data: Array<DeviseMonaie>) => {
        this.deviseMonaieList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
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

  modificationIde(): void {
    if (this.validateForm.valid && this.zonesSubmit.length > 0
      && this.promoteurSubmit.length > 0 && this.previsionRealisationSubmit.length > 0) {

      const formData = this.validateForm.value;
      console.log(formData);

        this.ideSubmit.anneeReception = this.findValues.getObjectInList(formData.anneeReception, this.exerciceList);
        this.ideSubmit.montantTheorique = formData.montantTheorique;
        this.ideSubmit.montantDevise = formData.montantDevise;
        this.ideSubmit.deviseMonnaie = this.findValues.getObjectInList(formData.deviseMonnaie, this.deviseMonaieList);
        this.ideSubmit.typeCooperation = this.findValues.getObjectInList(formData.typeCooperation, this.typecooperationList);
        this.ideSubmit.secteur = this.findValues.getObjectListInList(formData.secteur, this.secteurList);
        this.ideSubmit.libelle = formData.libelle;
        this.ideSubmit.observation = formData.observation;
        this.ideSubmit.zone = this.zonesSubmit;
        this.ideSubmit.promoteurs = this.promoteurSubmit;
        this.ideSubmit.previsionRealisationIdes = this.previsionRealisationSubmit;
        this.ideSubmit.createBy = this.user.username;
        console.log(this.ideSubmit);
      this.ideService.save(this.ideSubmit).subscribe(
        (data: Ide) => {
          console.log(data);
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> L\'investissement direct étranger a été modifié avec succès avec la référence <strong>' + data.libelle +
              '</strong></p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => this.initialiseFormulaire()
          });
        },
        (error: HttpErrorResponse) => {
          this.createMessage('danger', 'Echec de modification de IDE !');
        });
    } else {

    }
  }


  initialiseFormulaire(): void {
    this.router.navigate(['admin/ide/list-ide']);
  }


  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  /* submitFormZone(): void {
    const localite = {
      id: null,
      libelle: this.validateFormZone.value.libelle,
      arrondissement: this.validateFormZone.value.arrondissement
    };
    console.log(localite);

    this.zoneLocaliteService.save(localite)
      .subscribe((res: ZoneLocalite) => {

          this.validateFormZone.reset();
          this.zonesList.unshift(res);
          this.zonesSubmit.unshift(res);
        },
        err => {
          console.log(err);
        });
  } */


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
    this.zonesSubmit.splice(i, i > -1 ? 1 : 0);
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
    let index = -1;
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
      console.log(previsionRealisation);


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
      // this.handleCancelPrevisionRealisationNew();
    }
  }


  checkDoublonElementprevisionRealisation(previsionRealisationIde: PrevisionRealisationIde): boolean {
    let rep: boolean = false;
    let i = 0;
    if (this.previsionRealisationSubmit != null) {
      while (i < this.previsionRealisationSubmit.length && rep === false) {
        if (this.previsionRealisationSubmit[i].annee.id === previsionRealisationIde.annee.id) {
          rep = true;
        }
        i++;
      }
    }
    return rep;
  }

  confirmerSuppressionPrevisionRealisation(p: PrevisionRealisationIde): void {
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression?</p>',
      nzOkText: 'Oui',
      nzCancelText: 'Non',
      nzOnOk: () => this.supprimerPrevivionRealisation(p),
      nzOnCancel: () => console.log('cancel')
    });
  }

  supprimerPrevivionRealisation(p: PrevisionRealisationIde): void {
    this.previsionRealisationIdeServivice.delete(p).subscribe(
      (data: boolean) => {
        this.previsionRealisationSubmit.splice(this.indexOfElement(p.id, this.previsionRealisationSubmit), 1);
      },
      (error: HttpErrorResponse) => {
        //   this.router.navigate(['dashboard']);
        this.createMessage('danger', 'Echec de supression !');
      });
  }

  // Debut méthode format monnetaire
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire
}
