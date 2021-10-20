import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SecteurService} from "../../../../services/secteur.service";
import {SousSecteurService} from "../../../../services/sous-secteur.service";
import {SousSecteur} from "../../../../models/SousSecteur";
import {Secteur} from "../../../../models/Secteur";
import {User} from "../../../../models/User";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";
import {NzModalService} from "ng-zorro-antd";
import {FindValues} from "../../../../payload/FindValues";

declare var $ :any;

@Component({
  selector: 'app-sous-secteur',
  templateUrl: './sous-secteur.component.html',
  styleUrls: ['./sous-secteur.component.css']
})
export class SousSecteurComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  soussecteur: SousSecteur = null;
  soussecteurList: Array<SousSecteur> = [];
  secteurList: Array<Secteur> = [];

  filter: any;
  user: User = null;
  selectedValue = '';
  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
              private router: Router,
              private secteurService: SecteurService,
              private soussecteurService: SousSecteurService,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.soussecteur = null;
    this.soussecteurList = [];
    this.makeListSecteurActivite();
    this.getList();
  }

  makeForm(soussecteur: SousSecteur): void {
    //console.log(soussecteur);
    this.validateForm = this.fb.group({
      libelle: [(soussecteur != null) ? soussecteur.libelle : null,
        [Validators.required,]],
      secteur: [(soussecteur != null) ? soussecteur.secteur.id : null,
        [Validators.required,]],
    });

    this.soussecteur = soussecteur;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      if(this.soussecteur == null) {
        this.soussecteur = new SousSecteur(null, formData.libelle, this.user.username , null,
          this.findValues.getObjectInList(formData.secteur, this.secteurList));
      } else {
        this.soussecteur.libelle = formData.libelle;
        this.soussecteur.secteur = this.findValues.getObjectInList(formData.secteur, this.secteurList);
        this.soussecteur.createBy = this.user.username;
      }
      console.log(this.soussecteur);
      if (this.checkDoublonElement(this.soussecteur) === false) {
        //this.secteurList.unshift(this.secteur);
        this.soussecteurService.save(this.soussecteur).subscribe(
          (data: SousSecteur) => {
            if(this.soussecteur.id != null) {
              this.soussecteurList.splice(this.indexOfElement(data.id), 1);
            }
            this.soussecteurList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.soussecteur = null;
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

  openModification(soussecteur: SousSecteur) {
    this.soussecteur = soussecteur;
    this.btnTitle = 'Modifier';
    this.makeForm(soussecteur);
  }

  openDeleteDialog(soussecteur: SousSecteur) {
    this.soussecteur = soussecteur;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  makeListSecteurActivite(): void {
    this.secteurService.list().subscribe(
      (data: Array<Secteur>) => {
        this.secteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  deleteElement() {
    this.soussecteur.deleteBy = this.user.username;
    this.soussecteurService.delete(this.soussecteur).subscribe(
      (data: SousSecteur) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.soussecteur = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.soussecteurList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  error(soussecteur: SousSecteur): void {
    this.soussecteur = soussecteur;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ soussecteur.libelle+'('+ soussecteur.secteur.libelle+')</b> ?</p>',
      nzOkText    : 'Oui',
      nzOkType    : 'danger',
      nzOnOk      : () => this.deleteElement(),
      nzCancelText: 'Non',
      nzOnCancel  : () => this.cancelForm()
    });
  }

  getList(): void {
    this.soussecteurService.list().subscribe(
      (data: Array<SousSecteur>) => {
        this.soussecteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  indexOfElement(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.soussecteurList.length && rep === false) {
      if (this.soussecteurList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(soussecteur: SousSecteur): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.soussecteurList.length && rep === false) {
      if (this.soussecteurList[i].secteur.id === soussecteur.secteur.id && this.soussecteurList[i].libelle === soussecteur.libelle && this.soussecteurList[i].id != soussecteur.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
