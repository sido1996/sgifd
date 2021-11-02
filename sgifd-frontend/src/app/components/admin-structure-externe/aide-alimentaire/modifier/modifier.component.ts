import { Component, OnInit } from '@angular/core';
import { Informateur } from '../../../../models/Informateur';
import { HttpErrorResponse } from '@angular/common/http';
import { Structure } from '../../../../models/Structure';
import { Ptf } from '../../../../models/Ptf';
import { Exercice } from '../../../../models/Exercice';
import { AideAlimentaire } from '../../../../models/AideAlimentaire';
import { Validators, FormBuilder } from '@angular/forms';
import { DeviseMonaie } from '../../../../models/DeviseMonaie';
import { FindValues } from '../../../../payload/FindValues';
import { User } from '../../../../models/User';
import { Pays } from '../../../../models/Pays';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzModalService } from 'ng-zorro-antd';
import { ExerciceService } from '../../../../services/exercice.service';
import { PaysService } from '../../../../services/pays.service';
import { ActivatedRoute } from '@angular/router';
import { InformateurService } from '../../../../services/informateur.service';
import { DeviseMonaieService } from '../../../../services/devise-monaie.service';
import { PtfService } from '../../../../services/ptf.service';
import { StructureService } from '../../../../services/structure.service';
import { AideAlimentaireService } from '../../../../services/services-structure-externe/aideAlimentaire.service';
import { AideCapitale } from '../../../../models/AideCapitale';
import { NatureAssistance } from '../../../../models/NatureAssistance';
import { Bourse } from '../../../../models/Bourse';
import { Commune } from '../../../../models/Commune';
import { CycleBourse } from '../../../../models/CycleBourse';
import { FiliereBourse } from '../../../../models/FiliereBourse';
import { Sexe } from '../../../../models/Sexe';
import { Departement } from '../../../../models/Departement';
import { NatureAssistanceService } from '../../../../services/nature-assistance.service';
import { AideCapitaleService } from '../../../../services/services-structure-externe/aide-capitale.service';
import { DepartementService } from '../../../../services/departement.service';
import { CommuneService } from '../../../../services/commune.service';
import { FiliereBourseService } from '../../../../services/filiere-bourse.service';
import { CyclebourseService } from '../../../../services/cyclebourse.service';
import { SexeService } from '../../../../services/sexe.service';
import { BourseService } from '../../../../services/services-structure-externe/bourse.service';
import {NatureAideAlimentaire} from "../../../../models/nature-aide-alimentaire";
import {NatureAideAlimentaireDetail} from "../../../../models/nature-aide-alimentaire-detail";
import {NatureAideAlimentaireDetailService} from "../../../../services/nature-aide-alimentaire-detail.service";
import {NatureAideAlimentaireService} from "../../../../services/nature-aide-alimentaire.service";

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {

  validateFormNatureAideAlimentaireDetail: FormGroup;
  natureAideAlimentaireList: Array<NatureAideAlimentaire> = [];
  isNotificationFormNatureAideAlimentaireDetail: boolean = false;
  typeNotificationFormNatureAideAlimentaireDetail: string;
  messageNotificationFormNatureAideAlimentaireDetail: string;
  natureAideAlimentaireDetailList: Array<NatureAideAlimentaireDetail> = [];

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationFormInformateur: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  typeNotificationFormInformateur: string;
  messageNotificationForm: string;
  messageNotificationFormAssistance: string;
  messageNotificationFormInformateur: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;
  btnTitleInformateur: string;
  deviseMonaieList: Array<DeviseMonaie> = [];

  aideAlimentaire: AideAlimentaire = null;
  informateur: Informateur = null;
  aideAlimentaireList: Array<AideAlimentaire> = [];
  informateurList: Array<Informateur> = [];
  exerciceList: Array<Exercice> = [];
  paysList: Array<Pays> = [];

  filter: any;
  user: User = null;

  isVisibleAssistance = false;
  isVisibleInformateur = false;

  private findValues: FindValues = new FindValues();

  paramKey: number;
  ptfList: Array<Ptf> = [];
  sourceInformationList: Array<Structure> = [];
  filter3: any = null;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,
    private exerciceService: ExerciceService,
    private paysService: PaysService,
    private activeRoute: ActivatedRoute,
    private informateurService: InformateurService,
    private aideAlimentaireService: AideAlimentaireService,
    private deviseMonaieService: DeviseMonaieService,
    private ptfService: PtfService,
    private structureService: StructureService,
    private natureAideAlimentaireDetailService: NatureAideAlimentaireDetailService,
    private natureAideAlimentaireService: NatureAideAlimentaireService

  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }


  ngOnInit() {
    this.makeFormNatureAideAlimentaireDetail();
    this.getListNatureAideLimentaire();

    this.paramKey = this.activeRoute.snapshot.params['paramKey'];
    this.rechercheInformateur();
    this.makeListAnnee();
    this.makeListPtf();
    this.getListDevise();
    this.makeForm();

    this.aideAlimentaireService.getById(this.paramKey).subscribe(
      (data: AideAlimentaire) => {
        console.log(data);
        this.aideAlimentaire = data;
        this.informateur = data.informateur;
        this.natureAideAlimentaireDetailList = data.natureAideAlimentaireDetails;
        this.natureAideAlimentaireDetailList = [...this.natureAideAlimentaireDetailList];
        this.makeForm();
      });

    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.btnTitleInformateur = 'Enregistrer';
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

  showModalInformateur(): void {
    //this.initFormAssistance();
    this.isVisibleInformateur = true;
  }

  handleOkAssistance(): void {
    console.log('Button ok clicked!');
    this.isVisibleAssistance = false;
  }

  handleCancelAssistance(): void {
    console.log('Button cancel clicked!');
    this.isVisibleAssistance = false;
  }

  handleOkInformateur(): void {
    console.log('Button ok clicked!');
    this.isVisibleInformateur = false;
  }

  handleCancelInformateur(): void {
    console.log('Button cancel clicked!');
    this.isVisibleInformateur = false;
  }



  makeForm(): void {
    this.validateForm = this.fb.group({
      exercice: [(this.aideAlimentaire != null && this.aideAlimentaire.exercice != null) ? this.aideAlimentaire.exercice.id : '#N/A',
      [Validators.required]],
      ptfBailleurFrs: [(this.aideAlimentaire != null && this.aideAlimentaire.ptfBailleurFrs != null) ? this.aideAlimentaire.ptfBailleurFrs.id : '#N/A',
      [Validators.required,]],
      montant: [(this.aideAlimentaire != null) ? this.aideAlimentaire.montant : '#N/A',
      [Validators.required,]],
      montantDevise: [(this.aideAlimentaire != null) ? this.aideAlimentaire.montantDevise : '#N/A',
      [Validators.required,]],
      deviseMonnaie: [(this.aideAlimentaire != null && this.aideAlimentaire.deviseMonnaie != null) ? this.aideAlimentaire.deviseMonnaie.id : '#N/A',
      [Validators.required,]],
      observations: [(this.aideAlimentaire != null) ? this.aideAlimentaire.observations : '#N/A',
      [Validators.required,]],

    });

  }

  submitForm(): void {

    if (this.validateForm.valid === true) {
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
      if (this.checkDoublonElementInformateur(this.informateur) === false) {
        //this.communeList.unshift(this.commune);
        this.informateurService.save(this.informateur).subscribe(
          (data: Informateur) => {
            this.informateur = data;

            if (this.informateur.id != null) {
              this.informateurList.splice(this.indexOfElementInformateur(data.id), 1);
            }
            this.informateurList.unshift(data);

            const formData = this.validateForm.value;

            this.aideAlimentaire.exercice = this.findValues.getObjectInList(formData.exercice, this.exerciceList);
            this.aideAlimentaire.ptfBailleurFrs = this.findValues.getObjectInList(formData.ptfBailleurFrs, this.ptfList);
            this.aideAlimentaire.montant = formData.montant;
            this.aideAlimentaire.montantDevise = formData.montantDevise;
            this.aideAlimentaire.deviseMonnaie = this.findValues.getObjectInList(formData.exercice, this.exerciceList);
            this.aideAlimentaire.informateur = this.informateur;
            this.aideAlimentaire.observations = formData.observations;

            console.log(this.aideAlimentaire);

            this.aideAlimentaireService.save(this.aideAlimentaire).subscribe(
              (data: AideAlimentaire) => {

                this.notificationForm('success', 'Enregistrement effectué !');
                this.modalService.info({
                  nzTitle: 'Information',
                  nzContent: '<p> L\'aide a été modifiée avec succès au numéro :  <strong>' + data.id +
                    '</strong> pour un montant de <strong>' + data.montant + ' francs CFA </strong> .</p>',
                  nzOkText: null,
                  nzCancelText: 'Ok',
                  nzOnCancel: () => this.initialiseFormulaire()
                });
              },
              (error: HttpErrorResponse) => {
                this.notificationForm('danger', 'Echec de l\'enregistrement !');
              });

          },
          (error: HttpErrorResponse) => {
            //   this.router.navigate(['dashboard']);
            this.notificationFormInformateur('danger', 'Echec de l\'enregistrement !');
          });
      } else {
        this.notificationFormInformateur('danger', 'Doublon d\'enregistrement !');
      }

    } else {
      this.notificationFormInformateur('danger', 'Formulaire invalide !');
    }
  }

  initialiseFormulaire(): void {
    this.gotoListAide();
  }

  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
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

  gotoListAide() {
    this.router.navigate(['admin-structure-externe/aide-secours-structure/list']);
  }

  indexOfElement(id: number): number {
    let index = -1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.aideAlimentaireList.length && rep === false) {
      if (this.aideAlimentaireList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }


  indexOfElementInformateur(id: number): number {
    let index = -1;
    index = this.informateurList.findIndex(i => i.id == id);

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
      if (this.informateurList[i].tel === informateur.tel && this.informateurList[i].email === informateur.email &&
        this.informateurList[i].id != informateur.id) {
        rep = true;
      }
      i++;
    }
    return rep;
  }


  //nature aide alimentaire
  makeFormNatureAideAlimentaireDetail(): void {
    this.validateFormNatureAideAlimentaireDetail = this.fb.group({
      quantite: [null, [Validators.required]],
      natureAideAlimentaire: [null, [Validators.required,]],
      caracteristique: [null, [Validators.required,]],
      montantDevise: [0],
      montant: [0],
    });
  }

  getListNatureAideLimentaire(): void {
    this.natureAideAlimentaireService.list().subscribe(
      (data: Array<NatureAideAlimentaire>) => {
        this.natureAideAlimentaireList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  submitFormNatureAideAlimentaireDetail(): void {
    if (this.validateFormNatureAideAlimentaireDetail.valid === true) {
      const formData = this.validateFormNatureAideAlimentaireDetail.value;

      const i = this.natureAideAlimentaireDetailList.findIndex(n => n.natureAideAlimentaire.id
        == formData.natureAideAlimentaire.id);
      if (i > -1) {
        this.notificationFormNatureAideAlimentaireDetail('danger', 'Doublon d\'enregistrement !');
      } else {
        console.log(formData);

        this.natureAideAlimentaireDetailService.save(formData).subscribe(
          (data: NatureAideAlimentaireDetail) => {
            this.natureAideAlimentaireDetailList.unshift(data);
            this.validateFormNatureAideAlimentaireDetail.reset();
          },
          (error: HttpErrorResponse) => {
            this.notificationFormNatureAideAlimentaireDetail('danger', 'Echec de l\'enregistrement !');
          });
      }

    } else {
      this.notificationFormNatureAideAlimentaireDetail('danger', 'Formulaire invalide !');
    }
  }

  notificationFormNatureAideAlimentaireDetail(type: string, msg: string) {
    this.typeNotificationFormNatureAideAlimentaireDetail = type;
    this.messageNotificationFormNatureAideAlimentaireDetail = msg;
    this.isNotificationFormNatureAideAlimentaireDetail = true;
  }

  closeNotificationFormNatureAideAlimentaireDetail() {
    this.isNotificationFormNatureAideAlimentaireDetail = false;
  }

  deleteIde(natureAideAlimentaireDetail: NatureAideAlimentaireDetail): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de la nature : <b>' + natureAideAlimentaireDetail.natureAideAlimentaire.libelle + '</b> ?',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneNatureAideAlimentaireDetail(natureAideAlimentaireDetail),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneNatureAideAlimentaireDetail(natureAideAlimentaireDetail: NatureAideAlimentaireDetail): void {
    natureAideAlimentaireDetail.deleteBy = this.user.username;
    this.natureAideAlimentaireDetailService.delete(natureAideAlimentaireDetail).subscribe(
      (data: NatureAideAlimentaireDetail) => {
        const i = this.natureAideAlimentaireDetailList.findIndex(n => n.id == natureAideAlimentaireDetail.id);
        this.natureAideAlimentaireDetailList.splice(i, 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      });
  }

}
