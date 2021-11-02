import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ObjectifODD} from "../../../../models/ObjectifODD";
import {Router} from "@angular/router";
import {ObjectifOddService} from "../../../../services/objectif-odd.service";
import {DomainePTF} from "../../../../models/DomainePTF";
import {DomainePtfService} from "../../../../services/domaine-ptf.service";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {User} from "../../../../models/User";
import {HttpErrorResponse} from "@angular/common/http";

declare var $ :any;

@Component({
  selector: 'app-objectif-odd',
  templateUrl: './objectif-odd.component.html',
  styleUrls: ['./objectif-odd.component.css']
})
export class ObjectifOddComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  objectifodd: ObjectifODD;
  objectifoddList: Array<ObjectifODD> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private objectifoddService: ObjectifOddService,
              private DomainePTF: DomainePtfService,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.objectifodd = null;
    this.objectifoddList = [];
    this.getList();
  }

  makeForm(objectifODD: ObjectifODD): void {
    this.validateForm = this.fb.group({
      code: [(objectifODD != null) ? objectifODD.code : null,
        [Validators.required,]],
      libelle: [(objectifODD != null) ? objectifODD.libelle : null,
        [Validators.required,]],
    });
    this.objectifodd = objectifODD;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if(this.objectifodd == null) {
        this.objectifodd = new ObjectifODD(null, formData.libelle, this.user.username, null, formData.code);
      }else {
        this.objectifodd.code = formData.code;
        this.objectifodd.libelle = formData.libelle;
        this.objectifodd.createBy = this.user.username;
      }

      console.log(this.objectifodd);
      if (this.checkDoublonElement(this.objectifodd) === false) {

        this.objectifoddService.save(this.objectifodd).subscribe(
          (data: ObjectifODD) => {
            const i = this.indexOfElement(data.id);
            this.objectifoddList.splice(i, i > -1 ? 1 : 0);
            this.objectifoddList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.objectifodd = null;
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
    this.objectifodd = null;
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

  openModification(objectifodd: ObjectifODD) {
    this.makeForm(objectifodd);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(objectifodd: ObjectifODD) {
    this.objectifodd = objectifodd;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }


  deleteElement() {
    this.objectifodd.deleteBy = this.user.username;
    this.objectifoddService.delete(this.objectifodd).subscribe(
      (data: ObjectifODD) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.objectifodd = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.objectifoddList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.objectifoddService.list().subscribe(
      (data: Array<ObjectifODD>) => {
        this.objectifoddList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(objectifodd: ObjectifODD): void {
    this.objectifodd = objectifodd;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ objectifodd.libelle+'</b> ?</p>',
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
    while (i < this.objectifoddList.length && rep === false) {
      if (this.objectifoddList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(objectifodd: ObjectifODD): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.objectifoddList.length && rep === false) {
      if (this.objectifoddList[i].libelle === objectifodd.libelle && this.objectifoddList[i].id != objectifodd.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
