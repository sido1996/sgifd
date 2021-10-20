import { Component, OnInit } from '@angular/core';
import { Exercice } from '../../../../models/Exercice';
import { DeviseMonaie } from '../../../../models/DeviseMonaie';
import { NatureFinancement } from '../../../../models/NatureFinancement';
import { Ptf } from '../../../../models/Ptf';
import { Structure } from '../../../../models/Structure';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { TokenStorage } from '../../../../utils/token.storage';
import { NatureFinancementService } from '../../../../services/nature-financement.service';
import { TypeAssistantService } from '../../../../services/type-assistant.service';
import { ExerciceService } from '../../../../services/exercice.service';
import { PtfService } from '../../../../services/ptf.service';
import { StructureService } from '../../../../services/structure.service';
import { NatureAssistanceService } from '../../../../services/nature-assistance.service';
import { NzMessageService } from 'ng-zorro-antd';
import { DeviseMonaieService } from '../../../../services/devise-monaie.service';
import { User } from '../../../../models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { TypeAppuiBudgetaire } from '../../../../models/TypeAppuiBudgetaire';
import { TypeAppuiBudgetaireService } from '../../../../services/type-appui-budgetaire.service';
import { AppuiBudgetaire } from '../../../../models/AppuiBudgetaire';
import { AppuiBudgetaireService } from '../../../../services/appui-budgetaire.service';

@Component({
  selector: 'app-nouveau-appui-budgetaire',
  templateUrl: './nouveau-appui-budgetaire.component.html',
  styleUrls: ['./nouveau-appui-budgetaire.component.css']
})
export class NouveauAppuiBudgetaireComponent implements OnInit {
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
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  makeForm(): void {
    this.validateForm = this.fb.group({
      annee: [null, [Validators.required]],
      ptfBailleurFrs: [null, [Validators.required,]],
      natureFinancement: [null, [Validators.required,]],
      typeAppuiBudgetaire: [null, [Validators.required,]],
      montant: [null, [Validators.required,]],
      montantDevise: [null, [Validators.required,]],
      deviseMonnaie: [null, [Validators.required,]],
      observation: [null],
      structureBeneficiaire: [null, [Validators.required,]],
    });
  }
  submitForm(): void {
    if (this.validateForm.valid == true) {
      const formData = this.validateForm.value;
      this.appuibudgetaire = new AppuiBudgetaire(
        null,
        formData.annee,
        formData.typeAppuiBudgetaire,
        formData.natureAssistance,
        formData.natureFinancement,
        formData.ptfBailleurFrs,
        formData.montantDevise,
        formData.deviseMonnaie,
        formData.montant,
        formData.observation,
        formData.structureBeneficiaire,
        null,
        this.user.username,
        null
      );
      console.log(this.appuibudgetaire);
      this.appuibudgetaireService.save(this.appuibudgetaire).subscribe(
        (data: AppuiBudgetaire) => {
          this.appuibudgetaire = data;
          console.log(this.appuibudgetaire);
          this.notificationForm('success', 'Enregistrement effectué !');
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> Apuii Budgétaire a été enregistrée avec succès au numéro :  <strong>' + data.id +
              '</strong> pour un montant de <strong>' + data.montant + ' francs CFA </strong> .</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => this.validateForm.reset()
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
    this.router.navigate(['admin/appui-budgetaire/list-appui-budgetaire']);
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
