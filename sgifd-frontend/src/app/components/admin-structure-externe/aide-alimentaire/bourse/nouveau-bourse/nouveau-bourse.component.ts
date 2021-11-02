import {Component, OnInit} from '@angular/core';
import {DeviseMonaie} from '../../../../../models/DeviseMonaie';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AideCapitale} from '../../../../../models/AideCapitale';
import {Informateur} from '../../../../../models/Informateur';
import {Exercice} from '../../../../../models/Exercice';
import {Bourse} from '../../../../../models/Bourse';
import {Commune} from '../../../../../models/Commune';
import {CycleBourse} from '../../../../../models/CycleBourse';
import {FiliereBourse} from '../../../../../models/FiliereBourse';
import {Sexe} from '../../../../../models/Sexe';
import {Departement} from '../../../../../models/Departement';
import {Ptf} from '../../../../../models/Ptf';
import {Structure} from '../../../../../models/Structure';
import {User} from '../../../../../models/User';
import {FindValues} from '../../../../../payload/FindValues';
import {Router} from '@angular/router';
import {TokenStorage} from '../../../../../utils/token.storage';
import {NzModalService} from 'ng-zorro-antd';
import {ExerciceService} from '../../../../../services/exercice.service';
import {PtfService} from '../../../../../services/ptf.service';
import {StructureService} from '../../../../../services/structure.service';
import {InformateurService} from '../../../../../services/informateur.service';
import {AideCapitaleService} from '../../../../../services/aide-capitale.service';
import {DepartementService} from '../../../../../services/departement.service';
import {CommuneService} from '../../../../../services/commune.service';
import {FiliereBourseService} from '../../../../../services/filiere-bourse.service';
import {CyclebourseService} from '../../../../../services/cyclebourse.service';
import {SexeService} from '../../../../../services/sexe.service';
import {DeviseMonaieService} from '../../../../../services/devise-monaie.service';
import {BourseService} from '../../../../../services/bourse.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-nouveau-bourse',
  templateUrl: './nouveau-bourse.component.html',
  styleUrls: ['./nouveau-bourse.component.css']
})
export class NouveauBourseComponent implements OnInit {
  validateForm: FormGroup;
  validateFormBourse: FormGroup;
  validateFormInformateur: FormGroup;

  isNotificationForm: boolean = false;
  isNotificationFormInformateur: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  deviseMonaieList: Array<DeviseMonaie> = [];
  typeNotificationForm: string;
  typeNotificationFormInformateur: string;
  typeNotificationFormBourse: string;
  messageNotificationForm: string;
  messageNotificationFormInformateur: string;
  messageNotificationFormBourse: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;
  btnTitleInformateur: string;

  aideCapitale: AideCapitale = null;
  informateur: Informateur = null;

  informateurList: Array<Informateur> = [];
  exerciceList: Array<Exercice> = [];
  bourseList: Array<Bourse> = [];
  communeList: Array<Commune> = [];
  cycleBourseList: Array<CycleBourse> = [];
  filiereList: Array<FiliereBourse> = [];
  sexeList: Array<Sexe> = [];
  departementList: Array<Departement> = [];
  selectedListBourses: Array<Bourse> = [];
  ptfList: Array<Ptf> = [];
  sourceInformationList: Array<Structure> = [];

  filter: any;
  user: User = null;

  isVisibleAssistance: boolean = false;
  isVisibleInformateur: boolean = false;
  isNotificationFormBourse: boolean = false;
  isVisibleBourse: boolean = false;
  isVisible: boolean = false;

  private findValues: FindValues = new FindValues();

  bourse: Bourse = null;
  index: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,
    private exerciceService: ExerciceService,
    private ptfService: PtfService,
    private structureService: StructureService,
    private informateurService: InformateurService,
    private aideCapitaleService: AideCapitaleService,
    private departementService: DepartementService,
    private communeService: CommuneService,
    private filiereBourseService: FiliereBourseService,
    private cyclebourseService: CyclebourseService,
    private sexeService: SexeService,
    private deviseMonaieService: DeviseMonaieService,
    private bourseServe: BourseService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }


  ngOnInit() {
    this.initFormBourse(null);
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.btnTitleInformateur = 'Enregistrer';
    this.makeListAnnee();
    this.makeListPtf();
    this.getDepartementList();
    this.getCycleList();
    this.getFiliereList();
    this.getSexeList();
    this.getListDevise();
    this.getBourseList();
    this.rechercheInformateur();
    //this.getListAideCapitale();
  }

  showModalBourse(): void {

    this.isVisibleBourse = true;
  }


  handleCancelBourse(): void {
    console.log('Button cancel clicked!');
    this.isVisibleBourse = false;
  }

  makeForm(aideCapitale: AideCapitale): void {
    this.validateForm = this.fb.group({
      exercice: [null, [Validators.required]],
      ptfBailleurFrs: [null, [Validators.required,]],
      montant: [null, [Validators.required]],
      montantDevise: [null, [Validators.required,]],
      deviseMonnaie: [null, [Validators.required,]],
      observations: [null],
    });
    this.aideCapitale = aideCapitale;
  }

  initFormBourse(bourse: Bourse): void {
    this.validateFormBourse = this.fb.group({
      filiere: [(bourse != null) ? bourse.filiereBourseEtude : null,
        [Validators.required]],
      cycle: [(bourse != null) ? bourse.cycleBourseEtude : null,
        [Validators.required]],
      sexe: [(bourse != null) ? bourse.sexe : null,],
      departement: [(bourse != null) ? bourse.departement : null,],
      commune: [(bourse != null) ? bourse.commune : null,],
      nombre: [(bourse != null) ? bourse.nombre : null,
        [Validators.required]],
    });
    this.bourse = bourse;
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

  getCycleList(): void {
    this.cyclebourseService.list()
      .subscribe((data: Array<Departement>) => {
        this.cycleBourseList = data;
        //this.selectedDepartement = this.departementData[0];
        console.log(this.cycleBourseList);
      }, err => {
        console.log(err);
      });
  }

  getSexeList(): void {
    this.sexeService.list()
      .subscribe((data: Array<Sexe>) => {
        this.sexeList = data;
        //this.selectedDepartement = this.departementData[0];
        console.log(this.sexeList);
      }, err => {
        console.log(err);
      });
  }

  makeListPtf(): void {
    this.ptfService.list().subscribe(
      (data: Array<Ptf>) => {
        this.ptfList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  getBourseList(): void {
    this.bourseServe.list()
      .subscribe((data: Array<Bourse>) => {
        this.bourseList = data;
        //this.selectedDepartement = this.departementData[0];
        console.log(this.bourseList);

      }, err => {
        console.log(err);
      });
  }

  getFiliereList(): void {
    this.filiereBourseService.list()
      .subscribe((data: Array<Departement>) => {
        this.filiereList = data;
        //this.selectedDepartement = this.departementData[0];
        console.log(this.filiereList);

      }, err => {
        console.log(err);
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


  departementChange(departement: Departement): void {

    this.communeService.listParDepartement(departement.id)
      .subscribe((data: Array<Commune>) => {
        this.communeList = data;
        console.log(this.communeList);
      }, err => {
        console.log(err);
      });
  }

  submitForm(): void {

    if (this.validateForm.valid === true && this.selectedListBourses.length > 0) {
      if (this.informateur == null) {
        this.informateur = new Informateur(
          null,
          this.user.lastName,
          this.user.firstName,
          this.user.tel,
          this.user.email,
          this.user.profession,
          this.user.username,
          null,
          this.user.structureBeneficiaire
        );
      } else {

      }
      console.log(this.informateur);

      this.informateurService.save(this.informateur).subscribe(
        (data: Informateur) => {
          this.informateur = data;
          console.log(this.informateur);

          this.informateurList.splice(this.indexOfElementInformateur(data.id), 1);

          this.informateurList.unshift(data);

          const formData = this.validateForm.value;

          this.aideCapitale = new AideCapitale(null, formData.exercice, formData.ptfBailleurFrs, null,
            formData.montant, this.selectedListBourses, this.informateur, formData.observations, null, this.user.username, null, formData.montantDevise, formData.deviseMonnaie);

          console.log(this.aideCapitale);

          this.aideCapitaleService.save(this.aideCapitale).subscribe(
            (data: AideCapitale) => {
              this.aideCapitale = data;
              console.log(this.aideCapitale);
              this.notificationForm('success', 'Enregistrement effectué !');
              this.modalService.info({
                nzTitle: 'Information',
                nzContent: '<p> L\'aide a été enregistrée avec succès au numéro :  <strong>' + data.id +
                  '</strong> pour un montant de <strong>' + data.montant + ' francs CFA </strong> .</p>',
                nzOkText: null,
                nzCancelText: 'Ok',
                nzOnCancel: () => this.initialiseFormulaire()
              });
            },
            (error: HttpErrorResponse) => {

              this.notificationFormBourse('danger', 'Echec de l\'enregistrement !');
            });
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.notificationFormInformateur('danger', 'Echec de l\'enregistrement !');
        });

    } else {
      this.notificationFormInformateur('danger', 'Formulaire invalide !');
    }
  }

  initialiseFormulaire(): void {
    this.initFormBourse(null);
    this.makeForm(null);
    this.selectedListBourses = [];
  }

  submitFormBourse(): void {
    if (this.validateFormBourse.valid === true) {
      const formData = this.validateFormBourse.value;


      this.bourse = new Bourse(
        null, formData.filiere, formData.cycle, formData.sexe, formData.departement,
        formData.commune, formData.nombre, this.user.username, null);

      console.log(this.bourse);

      this.bourseServe.save(this.bourse).subscribe(
        (data: Bourse) => {
          this.bourse = data;
          this.selectedListBourses.unshift(this.bourse);
          this.validateFormBourse.reset();
        },
        (error: HttpErrorResponse) => {

          this.notificationFormBourse('danger', 'Echec de l\'enregistrement !');
        });

    } else {
      this.notificationFormBourse('danger', 'Formulaire invalide !');
    }

  }

  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }

  notificationFormBourse(type: string, msg: string) {
    this.typeNotificationFormBourse = type;
    this.messageNotificationFormBourse = msg;
    this.isNotificationFormBourse = true;
  }

  notificationFormInformateur(type: string, msg: string) {
    this.typeNotificationFormInformateur = type;
    this.messageNotificationFormInformateur = msg;
    this.isNotificationFormInformateur = true;
  }

  notificationTable(type: string, msg: string) {
    this.typeNotificationTable = type;
    this.messageNotificationTable = msg;
    this.isNotificationTable = true;
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }


  closeNotificationFormInformateur() {
    this.isNotificationFormInformateur = false;
  }

  closeNotificationFormBourse() {
    this.isNotificationFormBourse = false;
  }

  closeNotificationTable() {
    this.isNotificationTable = false;
  }


  get f() {
    return this.validateForm.controls;
  }


  makeListAnnee(): void {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  gotoListAide() {
    this.router.navigate(['admin-structure-externe/aide-secours-structure/list-bourse']);
  }


  deleteIde(bourse: Bourse): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de filière : <b>' + bourse.filiereBourseEtude.libelle + '</b>' +
        ' cycle : <b>' + bourse.cycleBourseEtude.libelle + '</b> et nombre :  <b> ' + bourse.nombre + '</b> ?',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneBourse(bourse),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneBourse(bourse: Bourse): void {
    bourse.deleteBy = this.user.username;
    this.bourseServe.delete(bourse).subscribe(
      (data: Bourse) => {
        //this.getList();
        this.selectedListBourses.splice(this.indexOfElement(data.id, this.selectedListBourses), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      });
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


  indexOfElementInformateur(id: number): number {
    let index = -1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.informateurList.length && rep === false) {
      if (this.informateurList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  rechercheInformateur(): void {
    this.informateurService.rechercheInformateur().subscribe(
      (data: Informateur) => {
        this.informateur = data;
        console.log("===== data ========");
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }


  checkDoublonElementInformateur(informateur: Informateur): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.informateurList.length && rep === false) {
      if (
        this.informateurList[i].tel === informateur.tel && this.informateurList[i].email === informateur.email
      ) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

  gotoListAideCapitale() {
    this.router.navigate(['admin-structure-externe/aide-secours-structure/list-bourse']);
  }
}
