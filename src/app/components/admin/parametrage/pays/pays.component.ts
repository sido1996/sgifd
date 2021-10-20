import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pays} from "../../../../models/Pays";
import {Router} from "@angular/router";
import {PaysService} from "../../../../services/pays.service";
import {User} from "../../../../models/User";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";
import { ContinentService } from '../../../../services/continent.service';
import { Continent } from '../../../../models/Continent';

declare var $ :any;

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  pays: Pays = null;
  paysList: Array<Pays> = [];

  continentList: Array<Continent> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private paysService: PaysService,
              private continentService: ContinentService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.pays = null;
    this.paysList = [];
    this.getList();
    this.makeContinentPays();
  }

  makeForm(pays: Pays): void {
    this.validateForm = this.fb.group({
      libelle: [(pays != null) ? pays.libelle : null,
        [Validators.required]],
        continent: [(pays != null && pays.continent != null) ? pays.continent.id : null,
          [Validators.required]],
    });
    this.pays = pays;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if(this.pays == null) {
        this.pays = new Pays(null, formData.libelle, this.user.username, null)
      } else {
        this.pays.libelle = formData.libelle;
      }
        this.pays.continent = this.continentList.find(c => c.id == formData.continent);
      this.pays.createBy = this.user.username;
      console.log(this.pays);
      //this.pays.continent = formData.continent;
      if (this.checkDoublonElement(this.pays) === false) {

        this.paysService.save(this.pays).subscribe(
          (data: Pays) => {
            if(this.pays.id != null) {
              this.paysList.splice(this.indexOfElement(data.id), 1);
            }
            this.paysList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.pays = null;
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
    this.pays = null;
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

  openModification(pays: Pays) {
    this.makeForm(pays);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(pays: Pays) {
    this.pays = pays;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.pays.deleteBy = this.user.username;
    this.paysService.delete(this.pays).subscribe(
      (data: Pays) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.pays = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.paysList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.paysService.list().subscribe(
      (data: Array<Pays>) => {
        this.paysList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  makeContinentPays(): void {
    this.continentService.list().subscribe(
      (data: Array<Continent>) => {
        this.continentList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  

  error(pays: Pays): void {
    this.pays = pays;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ pays.libelle+'</b> ?</p>',
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
    while (i < this.paysList.length && rep === false) {
      if (this.paysList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(pays: Pays): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.paysList.length && rep === false) {
      if (this.paysList[i].libelle === pays.libelle &&  this.paysList[i].id != pays.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
