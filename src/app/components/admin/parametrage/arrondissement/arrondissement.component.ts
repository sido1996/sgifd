import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommuneService } from '../../../../services/commune.service';
import { Arrondissement } from '../../../../models/Arrondissement';
import { Commune } from '../../../../models/Commune';
import { User } from '../../../../models/User';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzModalService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';
import { ArrondissementService } from '../../../../services/arrondissement.service';
import { FindValues } from '../../../../payload/FindValues';

declare var $: any;

@Component({
  selector: 'app-arrondissement',
  templateUrl: './arrondissement.component.html',
  styleUrls: ['./arrondissement.component.css']
})
export class ArrondissementComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  arrondissement: Arrondissement = null;
  arrondissementList: Array<Arrondissement> = [];
  communeList: Array<Commune> = [];

  filter: any;
  user: User = null;
  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,
    private communeService: CommuneService,
    private arrondissementService: ArrondissementService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.arrondissement = null;
    this.arrondissementList = [];
    this.makeListCommune();
    this.getList();
  }

  makeForm(arrondissement: Arrondissement): void {
    this.validateForm = this.fb.group({
      libelle: [(arrondissement != null) ? arrondissement.libelle : null,
      [Validators.required]],
      commune: [(arrondissement != null) ? arrondissement.commune.id : null,
      [Validators.required,]],
    });
    this.arrondissement = arrondissement;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if (this.arrondissement == null) {
        this.arrondissement = new Arrondissement(null, formData.libelle, this.user.username, null,
          this.findValues.getObjectInList(formData.commune, this.communeList));
      } else {
        this.arrondissement.libelle = formData.libelle;
        this.arrondissement.commune = this.findValues.getObjectInList(formData.commune, this.communeList);
        this.arrondissement.createBy = this.user.username;
      }
      console.log(this.arrondissement);
      if (this.checkDoublonElement(this.arrondissement) === false) {
        //this.communeList.unshift(this.commune);
        this.arrondissementService.save(this.arrondissement).subscribe(
          (data: Arrondissement) => {
            if (this.arrondissement.id != null) {
              this.arrondissementList.splice(this.indexOfElement(data.id), 1);
            }
            this.arrondissementList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.arrondissement = null;
            this.submitted = false;
            this.btnTitle = 'Enregistrer';
            this.validateForm.reset();
          },
          (error: HttpErrorResponse) => {
            //   this.router.navigate(['dashboard']);
            this.notificationForm('danger', 'Echec de l\'enregistrement !');
          }
        );
      } else {
        this.notificationForm('danger', 'Doublon d\'enregistrement !');
      }

    } else {
      this.notificationForm('danger', 'Formulaire invalide !');
    }

  }

  cancelForm(): void {
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.submitted = false;
    this.arrondissement = null;
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

  openModification(arrondissement: Arrondissement) {
    this.makeForm(arrondissement);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(arrondissement: Arrondissement) {
    this.arrondissement = arrondissement;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  makeListCommune(): void {
    this.communeService.list().subscribe(
      (data: Array<Commune>) => {
        this.communeList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  deleteElement() {
    this.arrondissement.deleteBy = this.user.username;
    this.arrondissementService.delete(this.arrondissement).subscribe(
      (data: Arrondissement) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.arrondissement = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.arrondissementList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  error(arrondissement: Arrondissement): void {
    this.arrondissement = arrondissement;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>' + arrondissement.libelle + '(' + arrondissement.commune.libelle + ')</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteElement(),
      nzCancelText: 'Non',
      nzOnCancel: () => this.cancelForm()
    });
  }

  getList(): void {
    this.arrondissementService.list().subscribe(
      (data: Array<Arrondissement>) => {
        this.arrondissementList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  indexOfElement(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.arrondissementList.length && rep === false) {
      if (this.arrondissementList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(arrondissement: Arrondissement): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.arrondissementList.length && rep === false) {
      if (this.arrondissementList[i].commune.id === arrondissement.commune.id && this.arrondissementList[i].libelle === arrondissement.libelle && this.arrondissementList[i].id != arrondissement.id) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

}
