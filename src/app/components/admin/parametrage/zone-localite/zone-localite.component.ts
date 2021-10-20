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
import { ZoneLocalite } from '../../../../models/ZoneLocalite';
import { ZoneLocaliteService } from '../../../../services/zone-localite.service';


@Component({
  selector: 'app-zone-localite',
  templateUrl: './zone-localite.component.html',
  styleUrls: ['./zone-localite.component.css']
})
export class ZoneLocaliteComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  zoneLocalite: ZoneLocalite = null;
  zoneLocaliteList: Array<ZoneLocalite> = [];
  arrondissementList: Array<Arrondissement> = [];

  filter: any;
  user: User = null;
  private findValues: FindValues = new FindValues();   

  constructor(private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,
    private communeService: CommuneService,
    private arrondissementService: ArrondissementService,
    private zoneLocaliteService: ZoneLocaliteService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.zoneLocalite = null;
    this.arrondissementList = [];
    this.makeListArrondissement();
    this.makeListZoneLocalite();
    this.getList();
  }

  makeForm(zoneLocalite: ZoneLocalite): void {
    this.validateForm = this.fb.group({
      libelle: [(zoneLocalite != null) ? zoneLocalite.libelle : null,
      [Validators.required]],
      arrondissement: [(zoneLocalite != null) ? zoneLocalite.arrondissement.id : null,
      [Validators.required,]],
    });
    this.zoneLocalite = zoneLocalite;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if (this.zoneLocalite == null) {
        this.zoneLocalite = new ZoneLocalite(null, formData.libelle, this.user.username, null,
          this.findValues.getObjectInList(formData.arrondissement, this.arrondissementList));
      } else {
        this.zoneLocalite.libelle = formData.libelle;
        this.zoneLocalite.arrondissement = this.findValues.getObjectInList(formData.arrondissement, this.arrondissementList);
        this.zoneLocalite.createBy = this.user.username;
      }
      console.log(this.zoneLocalite);
      if (this.checkDoublonElement(this.zoneLocalite) === false) {
        //this.communeList.unshift(this.commune);
        this.zoneLocaliteService.save(this.zoneLocalite).subscribe(
          (data: ZoneLocalite) => {
            if (this.zoneLocalite.id != null) {
              this.zoneLocaliteList.splice(this.indexOfElement(data.id), 1);
            }
            this.zoneLocaliteList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.zoneLocalite = null;
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
    this.zoneLocalite = null;
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

  openModification(zoneLocalite: ZoneLocalite) {
    this.makeForm(zoneLocalite);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(zoneLocalite: ZoneLocalite) {
    this.zoneLocalite = zoneLocalite;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  makeListArrondissement(): void {
    this.arrondissementService.list().subscribe(
      (data: Array<Arrondissement>) => {
        this.arrondissementList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  



  makeListZoneLocalite(): void {
    this.zoneLocaliteService.list().subscribe(
      (data: Array<ZoneLocalite>) => {
        this.zoneLocaliteList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  deleteElement() {
    this.zoneLocalite.deleteBy = this.user.username;
    this.zoneLocaliteService.delete(this.zoneLocalite).subscribe(
      (data: ZoneLocalite) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.zoneLocalite = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.zoneLocaliteList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  error(zoneLocalite: ZoneLocalite): void {
    this.zoneLocalite = zoneLocalite;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>' + zoneLocalite.libelle + '(' + zoneLocalite.arrondissement.libelle + ')</b> ?</p>',
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
    while (i < this.zoneLocaliteList.length && rep === false) {
      if (this.zoneLocaliteList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(zoneLocalite: ZoneLocalite): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.zoneLocaliteList.length && rep === false) {
      if (this.zoneLocaliteList[i].arrondissement.id === zoneLocalite.arrondissement.id && this.zoneLocaliteList[i].libelle === zoneLocalite.libelle && this.zoneLocaliteList[i].id != zoneLocalite.id) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

}
