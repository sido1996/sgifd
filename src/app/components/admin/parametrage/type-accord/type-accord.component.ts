import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeAccord} from "../../../../models/TypeAccord";
import {Router} from "@angular/router";
import {TypeAccordsService} from "../../../../services/type-accords.service";
import {User} from "../../../../models/User";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";

declare var $ :any;

@Component({
  selector: 'app-type-accord',
  templateUrl: './type-accord.component.html',
  styleUrls: ['./type-accord.component.css']
})
export class TypeAccordComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  typeaccord: TypeAccord = null;
  typeaccordList: Array<TypeAccord> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private typeaccordsService: TypeAccordsService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.typeaccord = null;
    this.typeaccordList = [];
    this.getList();
  }

  makeForm(typeaccord: TypeAccord): void {
    this.validateForm = this.fb.group({
      libelle: [(typeaccord != null) ? typeaccord.libelle : null,
        [Validators.required]],
    });
    this.typeaccord = typeaccord;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.typeaccord == null) ?
        this.typeaccord = new TypeAccord(null, formData.libelle, this.user.username, null):
        this.typeaccord.libelle = formData.libelle;
      this.typeaccord.createBy = this.user.username;
      console.log(this.typeaccord);
      if (this.checkDoublonElement(this.typeaccord) === false) {

        this.typeaccordsService.save(this.typeaccord).subscribe(
          (data: TypeAccord) => {
            if(this.typeaccord.id != null) {
              this.typeaccordList.splice(this.indexOfElement(data.id), 1);
            }
            this.typeaccordList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.typeaccord = null;
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
    this.typeaccord = null;
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

  openModification(typeaccord: TypeAccord) {
    this.makeForm(typeaccord);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(typeaccord: TypeAccord) {
    this.typeaccord = typeaccord;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.typeaccord.deleteBy = this.user.username;
    this.typeaccordsService.delete(this.typeaccord).subscribe(
      (data: TypeAccord) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.typeaccord = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.typeaccordList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.typeaccordsService.list().subscribe(
      (data: Array<TypeAccord>) => {
        this.typeaccordList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(typeaccord: TypeAccord): void {
    this.typeaccord = typeaccord;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ typeaccord.libelle+'</b> ?</p>',
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
    while (i < this.typeaccordList.length && rep === false) {
      if (this.typeaccordList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(typeaccord: TypeAccord): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.typeaccordList.length && rep === false) {
      if (this.typeaccordList[i].libelle === typeaccord.libelle && this.typeaccordList[i].id != typeaccord.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
