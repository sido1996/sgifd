import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../models/User";
import {StatusAccord} from "../../../../models/StatusAccord";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzModalService} from "ng-zorro-antd";
import {HttpErrorResponse} from "@angular/common/http";
import {StatusAccordService} from "../../../../services/status-accord.service";

@Component({
  selector: 'app-status-accord',
  templateUrl: './status-accord.component.html',
  styleUrls: ['./status-accord.component.css']
})
export class StatusAccordComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  user: User = null;

  statusaccord: StatusAccord;
  statusaccordList: Array<StatusAccord> = [];

  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private statusaccordService: StatusAccordService,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.statusaccord = null;
    this.statusaccordList = [];
    this.getList();
  }

  makeForm(statusaccord: StatusAccord): void {
    this.validateForm = this.fb.group({
      annee: [(statusaccord != null) ? statusaccord.libelle : null,
        [Validators.required]],
    });
    this.statusaccord = statusaccord;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.statusaccord == null) ?
        this.statusaccord = new StatusAccord(null, formData.annee, this.user.username, null):
        this.statusaccord.libelle = formData.annee;
      this.statusaccord.createBy = this.user.username;
      console.log(this.statusaccord);
      if (this.checkDoublonElement(this.statusaccord) === false) {
        //this.statusaccordList.unshift(this.statusaccord);
        this.statusaccordService.save(this.statusaccord).subscribe(
          (data: StatusAccord) => {
            if(this.statusaccord.id != null) {
              this.statusaccordList.splice(this.indexOfElement(data.id), 1);
            }
            this.statusaccordList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.statusaccord = null;
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
    this.btnTitle = 'Enregistrer';
    this.statusaccord = null;
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

  openModification(statusaccord: StatusAccord) {
    this.makeForm(statusaccord);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(statusaccord: StatusAccord) {
    this.statusaccord = statusaccord;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  getList(): void {
    this.statusaccordService.list().subscribe(
      (data: Array<StatusAccord>) => {
        this.statusaccordList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  deleteElement() {
    this.statusaccord.deleteBy = this.user.username;
    this.statusaccordService.delete(this.statusaccord).subscribe(
      (data: StatusAccord) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.statusaccord = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.statusaccordList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  error(statusaccord: StatusAccord): void {
    this.statusaccord = statusaccord;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ statusaccord.libelle+'</b> ?</p>',
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
    while (i < this.statusaccordList.length && rep === false) {
      if (this.statusaccordList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(statusaccord: StatusAccord): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.statusaccordList.length && rep === false) {
      if (this.statusaccordList[i].libelle === statusaccord.libelle && this.statusaccordList[i].id != statusaccord.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
