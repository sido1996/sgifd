import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Envergure} from "../../../../models/Envergure";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";
import {EnvergureService} from "../../../../services/envergure.service";

@Component({
  selector: 'app-envergure',
  templateUrl: './envergure.component.html',
  styleUrls: ['./envergure.component.css']
})
export class EnvergureComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  envergure: Envergure;
  envergureList: Array<Envergure> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private envergureService: EnvergureService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.envergure = null;
    this.envergureList = [];
    this.getList();
  }

  makeForm(envergure: Envergure): void {
    this.validateForm = this.fb.group({
      libelle: [(envergure != null) ? envergure.libelle : null,
        [Validators.required]],
    });
    this.envergure = envergure;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.envergure == null) ?
        this.envergure = new Envergure(null, formData.libelle, this.user.username, null):
        this.envergure.libelle = formData.libelle;
      this.envergure.createBy = this.user.username;
      console.log(this.envergure);
      if (this.checkDoublonElement(this.envergure) === false) {

        this.envergureService.save(this.envergure).subscribe(
          (data: Envergure) => {
            if(this.envergure.id != null) {
              this.envergureList.splice(this.indexOfElement(data.id), 1);
            }
            this.envergureList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.envergure = null;
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
    this.envergure = null;
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

  openModification(envergure: Envergure) {
    this.makeForm(envergure);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(envergure: Envergure) {
    this.envergure = envergure;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.envergure.deleteBy = this.user.username;
    this.envergureService.delete(this.envergure).subscribe(
      (data: Envergure) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.envergure = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.envergureList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.envergureService.list().subscribe(
      (data: Array<Envergure>) => {
        this.envergureList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(envergure: Envergure): void {
    this.envergure = envergure;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ envergure.libelle+'</b> ?</p>',
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
    while (i < this.envergureList.length && rep === false) {
      if (this.envergureList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(envergure: Envergure): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.envergureList.length && rep === false) {
      if (this.envergureList[i].libelle === envergure.libelle && this.envergureList[i].id != envergure.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }


}
