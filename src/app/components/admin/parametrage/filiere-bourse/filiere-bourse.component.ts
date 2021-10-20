import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FiliereBourse} from "../../../../models/FiliereBourse";
import {User} from "../../../../models/User";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";
import {FiliereBourseService} from "../../../../services/filiere-bourse.service";

declare var $ :any;

@Component({
  selector: 'app-filiere-bourse',
  templateUrl: './filiere-bourse.component.html',
  styleUrls: ['./filiere-bourse.component.css']
})
export class FiliereBourseComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  filierebourse: FiliereBourse = null;
  filierebourseList: Array<FiliereBourse> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private filierebourseService: FiliereBourseService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.filierebourse = null;
    this.filierebourseList = [];
    this.getList();
  }

  makeForm(filierebourse: FiliereBourse): void {
    this.validateForm = this.fb.group({
      libelle: [(filierebourse != null) ? filierebourse.libelle : null,
        [Validators.required]],
    });
    this.filierebourse = filierebourse;
  }


  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.filierebourse == null) ?
        this.filierebourse = new FiliereBourse(null, formData.libelle, this.user.username, null):
        this.filierebourse.libelle = formData.libelle;
      this.filierebourse.createBy = this.user.username;
      console.log(this.filierebourse);
      if (this.checkDoublonElement(this.filierebourse) === false) {

        this.filierebourseService.save(this.filierebourse).subscribe(
          (data: FiliereBourse) => {
            if(this.filierebourse.id != null) {
              this.filierebourseList.splice(this.indexOfElement(data.id), 1);
            }
            this.filierebourseList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.filierebourse = null;
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
    this.filierebourse = null;
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

  openModification(filierebourse: FiliereBourse) {
    this.makeForm(filierebourse);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(filierebourse: FiliereBourse) {
    this.filierebourse = filierebourse;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }
  deleteElement() {
    this.filierebourse.deleteBy = this.user.username;
    this.filierebourseService.delete(this.filierebourse).subscribe(
      (data: FiliereBourse) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.filierebourse = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.filierebourseList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.filierebourseService.list().subscribe(
      (data: Array<FiliereBourse>) => {
        this.filierebourseList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(filierebourse: FiliereBourse): void {
    this.filierebourse = filierebourse;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ filierebourse.libelle+'</b> ?</p>',
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
    while (i < this.filierebourseList.length && rep === false) {
      if (this.filierebourseList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(filierebourse: FiliereBourse): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.filierebourseList.length && rep === false) {
      if (this.filierebourseList[i].libelle === filierebourse.libelle && this.filierebourseList[i].id != filierebourse.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
