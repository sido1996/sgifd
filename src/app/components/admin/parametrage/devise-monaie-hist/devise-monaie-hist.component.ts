import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzModalService} from "ng-zorro-antd";
import {HttpErrorResponse} from "@angular/common/http";
import {DeviseMonaieHistService} from "../../../../services/devise-monaie-hist.service";
import {DeviseMonaieService} from "../../../../services/devise-monaie.service";
import {DeviseMonaieHist} from "../../../../models/DeviseMonaieHist";
import {DeviseMonaie} from "../../../../models/DeviseMonaie";
import {FindValues} from "../../../../payload/FindValues";

@Component({
  selector: 'app-devise-monaie-hist',
  templateUrl: './devise-monaie-hist.component.html',
  styleUrls: ['./devise-monaie-hist.component.css']
})
export class DeviseMonaieHistComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  devisemonnaiehist: DeviseMonaieHist = null;
  devisemonnaiehistList: Array<DeviseMonaieHist> = [];
  devisemonnaieList: Array<DeviseMonaie> = [];

  filter: any;
  user: User = null;
  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private devisemonnaiehistService: DeviseMonaieHistService,
              private devisemonnaieService: DeviseMonaieService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.devisemonnaiehist = null;
    this.devisemonnaiehistList = [];
    this.makeListDeviseMonaie();
  }
  makeForm(devisemonnaiehist: DeviseMonaieHist): void {
    this.validateForm = this.fb.group({
      dateConversion: [(devisemonnaiehist != null) ? devisemonnaiehist.dateConversion : null,
        [Validators.required,]],
      montantEquivalent: [(devisemonnaiehist != null) ? devisemonnaiehist.montantEquivalent : null,
        [Validators.required,]],
      devisemonnaie: [(devisemonnaiehist != null) ? devisemonnaiehist.deviseMonaie.id : null,
        [Validators.required,]],
      libelle: [(devisemonnaiehist != null) ? devisemonnaiehist.libelle : null],
    });
    this.devisemonnaiehist = devisemonnaiehist;
  }


  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if(this.devisemonnaiehist == null) {
        this.devisemonnaiehist = new DeviseMonaieHist(null, formData.libelle, this.user.username, null,
          formData.dateConversion, formData.montantEquivalent, this.findValues.getObjectInList(formData.devisemonnaie, this.devisemonnaieList));
      } else {
        this.devisemonnaiehist.libelle = formData.libelle;
        this.devisemonnaiehist.deviseMonaie = this.findValues.getObjectInList(formData.devisemonnaie, this.devisemonnaieList);
        this.devisemonnaiehist.createBy = this.user.username;
        this.devisemonnaiehist.montantEquivalent = formData.montantEquivalent;
        this.devisemonnaiehist.dateConversion = formData.dateConversion;
      }
      console.log(this.devisemonnaiehist);
      if (this.checkDoublonElement(this.devisemonnaiehist) === false) {
        //this.devisemonnaieList.unshift(this.devisemonnaie);
        this.devisemonnaiehistService.save(this.devisemonnaiehist).subscribe(
          (data: DeviseMonaieHist) => {
            if(this.devisemonnaiehist.id != null) {
              this.devisemonnaiehistList.splice(this.indexOfElement(data.id), 1);
            }
            this.devisemonnaiehistList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.devisemonnaiehist = null;
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
    this.devisemonnaiehist = null;
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

  openModification(devisemonnaiehist: DeviseMonaieHist) {
    this.makeForm(devisemonnaiehist);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(devisemonnaiehist: DeviseMonaieHist) {
    this.devisemonnaiehist = devisemonnaiehist;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  makeListDeviseMonaie(): void {
    this.devisemonnaieService.list().subscribe(
      (data: Array<DeviseMonaie>) => {
        this.devisemonnaieList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  deleteElement() {
    this.devisemonnaiehist.deleteBy = this.user.username;
    this.devisemonnaiehistService.delete(this.devisemonnaiehist).subscribe(
      (data: DeviseMonaieHist) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.devisemonnaiehist = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.devisemonnaiehistList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  error(devisemonnaiehist: DeviseMonaieHist): void {
    this.devisemonnaiehist = devisemonnaiehist;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ devisemonnaiehist.deviseMonaie.libelle+'('+
        devisemonnaiehist.montantEquivalent+' f cfa)</b> ?</p>',
      nzOkText    : 'Oui',
      nzOkType    : 'danger',
      nzOnOk      : () => this.deleteElement(),
      nzCancelText: 'Non',
      nzOnCancel  : () => this.cancelForm()
    });
  }

  getList(): void {
    this.devisemonnaiehistService.list().subscribe(
      (data: Array<DeviseMonaieHist>) => {
        this.devisemonnaiehistList = data;
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
    while (i < this.devisemonnaiehistList.length && rep === false) {
      if (this.devisemonnaiehistList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(devisemonnaiehist: DeviseMonaieHist): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.devisemonnaiehistList.length && rep === false) {
      if (this.devisemonnaiehistList[i].deviseMonaie.id === devisemonnaiehist.deviseMonaie.id && this.devisemonnaiehistList[i].dateConversion === devisemonnaiehist.dateConversion && this.devisemonnaiehistList[i].id != devisemonnaiehist.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }


}
