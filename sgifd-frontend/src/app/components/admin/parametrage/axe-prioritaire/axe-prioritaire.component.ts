import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AxePrioritaire } from '../../../../models/AxePrioritaire';
import { User } from '../../../../models/User';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { TokenStorage } from '../../../../utils/token.storage';
import { HttpErrorResponse } from '@angular/common/http';
import { AxePrioritaireService } from '../../../../services/axe-prioritaire.service';
import { FindValues } from '../../../../payload/FindValues';
import { PilierPAG } from '../../../../models/PilierPAG';
import { PiliersPagService } from '../../../../services/piliers-pag.service';

@Component({
  selector: 'app-axe-prioritaire',
  templateUrl: './axe-prioritaire.component.html',
  styleUrls: ['./axe-prioritaire.component.css']
})
export class AxePrioritaireComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  axeprioritaire: AxePrioritaire;
  axeprioritaireList: Array<AxePrioritaire> = [];
  pilierpagList: Array<PilierPAG> = [];
  private findValues: FindValues = new FindValues();

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private modalService: NzModalService,
    private tokenStorage: TokenStorage,
    private axeprioritaireService: AxePrioritaireService,
    private pilierpagService: PiliersPagService, ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.axeprioritaire = null;
    this.axeprioritaireList = [];
    this.getList();
    this.getListPilierPAG();
  }

  makeForm(axeprioritaire: AxePrioritaire): void {
    this.validateForm = this.fb.group({
      code: [(axeprioritaire != null) ? axeprioritaire.code : null,
      [Validators.required]],
      libelle: [(axeprioritaire != null) ? axeprioritaire.libelle : null,
      [Validators.required]],
      pilierPAG: [(axeprioritaire != null && axeprioritaire.pilierPAG != null) ? axeprioritaire.pilierPAG.id : null,
      [Validators.required]],
    });
    this.axeprioritaire = axeprioritaire;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if (this.axeprioritaire == null) {
        this.axeprioritaire = new AxePrioritaire(null, formData.libelle, this.user.username, null,
          this.pilierpagList.find(p=> p.id===formData.pilierPAG), formData.code);
      } else {
        this.axeprioritaire.code = formData.code;
        this.axeprioritaire.libelle = formData.libelle;
        this.axeprioritaire.createBy = this.user.username;
        this.axeprioritaire.pilierPAG = this.pilierpagList.find(p=> p.id===formData.pilierPAG);
      }
      console.log(this.axeprioritaire);
      if (this.checkDoublonElement(this.axeprioritaire) === false) {

        this.axeprioritaireService.save(this.axeprioritaire).subscribe(
          (data: AxePrioritaire) => {
            const i = this.indexOfElement(data.id);
            this.axeprioritaireList.splice(i, i > -1 ? 1 : 0);

            this.axeprioritaireList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.axeprioritaire = null;
            this.submitted = false;
            this.btnTitle = 'Enregistrer';
            this.validateForm.reset();
          },
          (error: HttpErrorResponse) => {
            this.notificationForm('danger', 'Echec de l\'enregistrement !');
          }
        );
      } else {
        this.notificationForm('danger', ' Doublon d\'enregistrement !');
      }
    } else {
      this.notificationForm('danger', 'Formulaire invalide !');
    }
  }

  cancelForm(): void {
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.submitted = false;
    this.axeprioritaire = null;
    this.btnTitle = 'Enregistrer';
    this.validateForm.reset();
  }

  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }

  notificationTable(type: string, msg: string) {
    this.typeNotificationTable = type;
    this.messageNotificationTable = msg;
    this.isNotificationTable = true;
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }

  closeNotificationTable() {
    this.isNotificationTable = false;
  }

  openModification(axeprioritaire: AxePrioritaire) {
    this.makeForm(axeprioritaire);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(axeprioritaire: AxePrioritaire) {
    this.axeprioritaire = axeprioritaire;
    console.log('suppression');
  }

  get f() {
    return this.validateForm.controls;
  }

  deleteElement() {
    this.axeprioritaire.deleteBy = this.user.username;
    this.axeprioritaireService.delete(this.axeprioritaire).subscribe(
      (data: AxePrioritaire) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.axeprioritaire = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.axeprioritaireList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.axeprioritaireService.list().subscribe(
      (data: Array<AxePrioritaire>) => {
        this.axeprioritaireList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  error(axeprioritaire: AxePrioritaire): void {
    this.axeprioritaire = axeprioritaire;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>' + axeprioritaire.libelle + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteElement(),
      nzCancelText: 'Non',
      nzOnCancel: () => this.cancelForm()
    });
  }

  indexOfElement(id: number): number {
    let index = -1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.axeprioritaireList.length && rep === false) {
      if (this.axeprioritaireList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(axeprioritaire: AxePrioritaire): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.axeprioritaireList.length && rep === false) {
      if (this.axeprioritaireList[i].libelle === axeprioritaire.libelle && this.axeprioritaireList[i].id != axeprioritaire.id) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

  getListPilierPAG(): void {
    this.pilierpagService.list().subscribe(
      (data: Array<PilierPAG>) => {
        this.pilierpagList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }
}
