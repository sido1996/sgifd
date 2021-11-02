import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TypeAppuiBudgetaire } from '../../../../models/TypeAppuiBudgetaire';
import { User } from '../../../../models/User';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { TokenStorage } from '../../../../utils/token.storage';
import { TypeAppuiBudgetaireService } from '../../../../services/type-appui-budgetaire.service';
import { Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-type-appui-budgetaire',
  templateUrl: './type-appui-budgetaire.component.html',
  styleUrls: ['./type-appui-budgetaire.component.css']
})
export class TypeAppuiBudgetaireComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  typeappuibudgetaire: TypeAppuiBudgetaire;
  typeassistanceList: Array<TypeAppuiBudgetaire> = [];

  user: User = null;
  filter: any;

  constructor(
              private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private typeappuibudgetaireService: TypeAppuiBudgetaireService
              ) { }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.typeappuibudgetaire = null;
    this.typeassistanceList = [];
    this.getList();
  }

  makeForm(typeappuibudgetaire: TypeAppuiBudgetaire): void {
    this.validateForm = this.fb.group({
      libelle: [(typeappuibudgetaire!= null) ? typeappuibudgetaire.libelle : null,
        [Validators.required]],
    });
    this.typeappuibudgetaire = typeappuibudgetaire;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.typeappuibudgetaire == null) ?
        this.typeappuibudgetaire = new TypeAppuiBudgetaire(null, formData.libelle, this.user.username, null):
        this.typeappuibudgetaire.libelle = formData.libelle;
      this.typeappuibudgetaire.createBy = this.user.username;
      console.log(this.typeappuibudgetaire);
      if (this.checkDoublonElement(this.typeappuibudgetaire) === false) {

        this.typeappuibudgetaireService.save(this.typeappuibudgetaire).subscribe(
          (data: TypeAppuiBudgetaire) => {
            if(this.typeappuibudgetaire.id != null) {
              this.typeassistanceList.splice(this.indexOfElement(data.id), 1);
            }
            this.typeassistanceList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.typeappuibudgetaire = null;
            this.submitted = false;
            this.btnTitle = 'Enregistrer';
            this.validateForm.reset();
          },
          (error: HttpErrorResponse) => {
            this.notificationForm('danger', 'Echec de l\'enregistrement !');
          });
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
    this.typeappuibudgetaire = null;
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

  openModification(typeappuibudgetaire: TypeAppuiBudgetaire) {
    this.makeForm(typeappuibudgetaire);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(typeappuibudgetaire: TypeAppuiBudgetaire) {
    this.typeappuibudgetaire = typeappuibudgetaire;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.typeappuibudgetaire.deleteBy = this.user.username;
    this.typeappuibudgetaireService.delete(this.typeappuibudgetaire).subscribe(
      (data: TypeAppuiBudgetaire) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.typeappuibudgetaire = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.typeassistanceList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.typeappuibudgetaireService.list().subscribe(
      (data: Array<TypeAppuiBudgetaire>) => {
        this.typeassistanceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(typeappuibudgetaire: TypeAppuiBudgetaire): void {
    this.typeappuibudgetaire = typeappuibudgetaire;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ typeappuibudgetaire.libelle+'</b> ?</p>',
      nzOkText    : 'Oui',
      nzOkType    : 'danger',
      nzOnOk      : () => this.deleteElement(),
      nzCancelText: 'Non',
      nzOnCancel  : () => this.cancelForm()
    });
  }

  indexOfElement(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.typeassistanceList.length && rep === false) {
      if (this.typeassistanceList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(typeappuibudgetaire: TypeAppuiBudgetaire): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.typeassistanceList.length && rep === false) {
      if (this.typeassistanceList[i].libelle === typeappuibudgetaire.libelle && this.typeassistanceList[i].id != typeappuibudgetaire.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }


}
