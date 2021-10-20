import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CyclebourseService} from "../../../../services/cyclebourse.service";
import {User} from "../../../../models/User";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {CycleBourse} from "../../../../models/CycleBourse";
import {HttpErrorResponse} from "@angular/common/http";

declare var $ :any;

@Component({
  selector: 'app-cycle-bourse',
  templateUrl: './cycle-bourse.component.html',
  styleUrls: ['./cycle-bourse.component.css']
})
export class CycleBourseComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  cyclebourse: CycleBourse = null;
  cyclebourseList: Array<CycleBourse> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private cyclebourseService: CyclebourseService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.cyclebourse = null;
    this.cyclebourseList = [];
    this.getList();
  }

  makeForm(cyclebourse: CycleBourse): void {
    this.validateForm = this.fb.group({
      libelle: [(cyclebourse != null) ? cyclebourse.libelle : null,
        [Validators.required]],
    });
    this.cyclebourse = cyclebourse;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.cyclebourse == null) ?
        this.cyclebourse = new CycleBourse(null, formData.libelle, this.user.username, null):
        this.cyclebourse.libelle = formData.libelle;
      this.cyclebourse.createBy = this.user.username;
      console.log(this.cyclebourse);
      if (this.checkDoublonElement(this.cyclebourse) === false) {

        this.cyclebourseService.save(this.cyclebourse).subscribe(
          (data: CycleBourse) => {
            if(this.cyclebourse.id != null) {
              this.cyclebourseList.splice(this.indexOfElement(data.id), 1);
            }
            this.cyclebourseList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.cyclebourse = null;
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
    this.cyclebourse = null;
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

  openModification(cyclebourse: CycleBourse) {
    this.makeForm(cyclebourse);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(filierebourse: CycleBourse) {
    this.cyclebourse = filierebourse;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.cyclebourse.deleteBy = this.user.username;
    this.cyclebourseService.delete(this.cyclebourse).subscribe(
      (data: CycleBourse) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.cyclebourse = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.cyclebourseList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.cyclebourseService.list().subscribe(
      (data: Array<CycleBourse>) => {
        this.cyclebourseList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(cyclebourse: CycleBourse): void {
    this.cyclebourse = cyclebourse;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ cyclebourse.libelle+'</b> ?</p>',
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
    while (i < this.cyclebourseList.length && rep === false) {
      if (this.cyclebourseList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(cyclebourse: CycleBourse): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.cyclebourseList.length && rep === false) {
      if (this.cyclebourseList[i].libelle === cyclebourse.libelle && this.cyclebourseList[i].id != cyclebourse.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
