import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Ptf } from '../../../../models/Ptf';
import { Exercice } from '../../../../models/Exercice';
import { Structure } from '../../../../models/Structure';
import { DeviseMonaie } from '../../../../models/DeviseMonaie';
import { NatureFinancement } from '../../../../models/NatureFinancement';
import { TypeAppuiBudgetaire } from '../../../../models/TypeAppuiBudgetaire';
import { AppuiBudgetaire } from '../../../../models/AppuiBudgetaire';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../../models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzModalService } from 'ng-zorro-antd';
import { NatureFinancementService } from '../../../../services/nature-financement.service';
import { TypeAssistantService } from '../../../../services/type-assistant.service';
import { ExerciceService } from '../../../../services/exercice.service';
import { TypeAppuiBudgetaireService } from '../../../../services/type-appui-budgetaire.service';
import { PtfService } from '../../../../services/ptf.service';
import { StructureService } from '../../../../services/structure.service';
import { NatureAssistanceService } from '../../../../services/nature-assistance.service';
import { NzMessageService } from 'ng-zorro-antd';
import { DeviseMonaieService } from '../../../../services/devise-monaie.service';
import { FindValues } from '../../../../payload/FindValues';
import { AppuiBudgetaireService } from '../../../../services/services-structure-externe/appui-budgetaire.service';

@Component({
  selector: 'app-modifier-appui',
  templateUrl: './modifier-appui.component.html',
  styleUrls: ['./modifier-appui.component.css']
})
export class ModifierAppuiComponent implements OnInit {

  validateForm: FormGroup;
  exerciceList: Array<Exercice> = [];
  typeAppuiBudgetaireList: Array<TypeAppuiBudgetaire> = [];
  devisemonaieList: Array<DeviseMonaie> = [];
  naturefinancementList: Array<NatureFinancement> = [];
  ptfList: Array<Ptf> = [];
  structureList: Array<Structure> = [];

  typeNotificationForm: string;
  isNotificationForm: boolean = false;
  messageNotificationForm: string;

  private findValues: FindValues = new FindValues();
  paramKey: number;

  appuiBudgetaireSubmit: AppuiBudgetaire = null;
  ptfSubmit: Ptf = null;
  structureSubmit: Structure = null;
  natureFinancementSubmit: NatureFinancement = null;
  deviseMonnaieSubmit: DeviseMonaie = null;

  appuibudgetaire: AppuiBudgetaire = null;
  user: User = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,
    private naturefinancementService: NatureFinancementService,
    private typeassistanceService: TypeAssistantService,
    private exerciceService: ExerciceService,
    private typeappuibudgetaireService: TypeAppuiBudgetaireService,
    private ptfService: PtfService,
    private structureService: StructureService,
    private activeRoute: ActivatedRoute,
    private natureassistanceService: NatureAssistanceService,
    private message: NzMessageService,
    private devisemonaieService: DeviseMonaieService,
    private appuibudgetaireService: AppuiBudgetaireService,

  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.getPTFList();
    this.getStructureList();
    this.getListExercice();
    this.getListAppuiBudgetaire();
    this.getListDevises();
    this.getListPtfs();
    this.getListNatureFinancement();
    this.makeForm();
    this.paramKey = this.activeRoute.snapshot.params['paramKey'];
    console.log(this.paramKey);

    this.appuibudgetaireService.getById(this.paramKey).subscribe(
      (data: AppuiBudgetaire) => {
        console.log(data);
        this.appuiBudgetaireSubmit = data;
        console.log(this.appuiBudgetaireSubmit);
        /* this.ptfSubmit = data.ptfBailleurFrs;
        console.log(this.ptfSubmit);
        this.structureSubmit = data.structureBeneficiaire;
        this.natureFinancementSubmit  = data.natureFinancement;
        this.deviseMonnaieSubmit  = data.deviseMonnaie; */
        this.makeForm();
      });

  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  makeForm(): void {
    this.validateForm = this.fb.group({
      annee: [(this.appuiBudgetaireSubmit != null && this.appuiBudgetaireSubmit.annee != null) ? this.appuiBudgetaireSubmit.annee.id : null,
      [Validators.required]],
      ptfBailleurFrs: [(this.appuiBudgetaireSubmit != null && this.appuiBudgetaireSubmit.ptfBailleurFrs != null) ? this.appuiBudgetaireSubmit.ptfBailleurFrs.id : null,
      [Validators.required,]],
      natureFinancement: [(this.appuiBudgetaireSubmit != null && this.appuiBudgetaireSubmit.natureFinancement != null) ? this.appuiBudgetaireSubmit.natureFinancement.id : null,
      [Validators.required,]],
      typeAppuiBudgetaire: [(this.appuiBudgetaireSubmit != null && this.appuiBudgetaireSubmit.typeAppuiBudgetaire != null) ? this.appuiBudgetaireSubmit.typeAppuiBudgetaire.id : null,
      [Validators.required,]],
      montant: [this.appuiBudgetaireSubmit != null ? this.appuiBudgetaireSubmit.montant : null,
      [Validators.required,]],
      montantDevise: [this.appuiBudgetaireSubmit != null ? this.appuiBudgetaireSubmit.montantDevise : null,
      [Validators.required,]],
      deviseMonnaie: [(this.appuiBudgetaireSubmit != null && this.appuiBudgetaireSubmit.deviseMonnaie != null) ? this.appuiBudgetaireSubmit.deviseMonnaie.id : null,
      [Validators.required,]],
      observation: [this.appuiBudgetaireSubmit != null ? this.appuiBudgetaireSubmit.observation : null,],

    });
  }

  submitForm(): void {
    if (this.validateForm.valid == true) {
      const formData = this.validateForm.value;

      this.appuiBudgetaireSubmit.annee = this.findValues.getObjectInList(formData.annee, this.exerciceList);
      this.appuiBudgetaireSubmit.typeAppuiBudgetaire = this.findValues.getObjectInList(formData.typeAppuiBudgetaire, this.typeAppuiBudgetaireList);
      this.appuiBudgetaireSubmit.natureFinancement = this.findValues.getObjectInList(formData.natureFinancement, this.naturefinancementList);
      this.appuiBudgetaireSubmit.ptfBailleurFrs = this.findValues.getObjectInList(formData.ptfBailleurFrs, this.ptfList);
      this.appuiBudgetaireSubmit.montantDevise = formData.montantDevise;
      this.appuiBudgetaireSubmit.montant = formData.montant;
      this.appuiBudgetaireSubmit.deviseMonnaie = this.findValues.getObjectInList(formData.deviseMonnaie, this.devisemonaieList);
      this.appuiBudgetaireSubmit.structureBeneficiaire = this.user.structureBeneficiaire;
      this.appuiBudgetaireSubmit.observation = formData.observation;


      this.appuiBudgetaireSubmit.createBy = this.user.username;


      console.log(this.appuiBudgetaireSubmit);
      this.appuibudgetaireService.save(this.appuiBudgetaireSubmit).subscribe(
        (data: AppuiBudgetaire) => {
          this.appuibudgetaire = data;
          console.log(this.appuibudgetaire);
          this.notificationForm('success', 'Enregistrement effectué !');
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> Apui Budgétaire a été modifier avec succès au numéro :  <strong>' + data.id +
              '</strong> pour un montant de <strong>' + data.montant + ' francs CFA </strong> .</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => this.gotoListAppuiBudgetaire()
          });
        },
        (error: HttpErrorResponse) => {

          this.notificationForm('danger', 'Echec de l\'enregistrement !');
        });
    } else {
      this.notificationForm('danger', 'Formulaire invalide !');
    }
  }

  gotoListAppuiBudgetaire() {
    this.router.navigate(['admin-structure-externe/appui-budgetaire-structure/list-appui-budgetaire/']);
  }

  getListPtfs(): void {
    this.ptfService.list().subscribe(
      (data: Array<Ptf>) => {
        this.ptfList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListAppuiBudgetaire(): void {
    this.typeappuibudgetaireService.list().subscribe(
      (data: Array<TypeAppuiBudgetaire>) => {
        this.typeAppuiBudgetaireList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getListNatureFinancement(): void {
    this.naturefinancementService.list().subscribe(
      (data: Array<NatureFinancement>) => {
        this.naturefinancementList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }
  getListDevises(): void {
    this.devisemonaieService.list().subscribe(
      (data: Array<DeviseMonaie>) => {
        this.devisemonaieList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  // Debut méthode format monnetaire
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire
  getStructureList(): void {
    this.structureService.list().subscribe(
      (data: Array<Structure>) => {
        this.structureList = data;
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

  getPTFList(): void {
    this.ptfService.list().subscribe(
      (data: Array<Ptf>) => {
        this.ptfList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }
  closeNotificationForm() {
    this.isNotificationForm = false;
  }

}
