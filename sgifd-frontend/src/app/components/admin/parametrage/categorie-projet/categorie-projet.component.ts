import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategorieProjet} from "../../../../models/CategorieProjet";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {CategorieProjetService} from "../../../../services/categorie-projet.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-categorie-projet',
  templateUrl: './categorie-projet.component.html',
  styleUrls: ['./categorie-projet.component.css']
})
export class CategorieProjetComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  categorieprojet: CategorieProjet;
  categorieprojetList: Array<CategorieProjet> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private categorieprojetService: CategorieProjetService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.categorieprojet = null;
    this.categorieprojetList = [];
    this.getList();
  }

  makeForm(categorieprojet: CategorieProjet): void {
    this.validateForm = this.fb.group({
      libelle: [(categorieprojet != null) ? categorieprojet.libelle : null,
        [Validators.required]],
    });
    this.categorieprojet = categorieprojet;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.categorieprojet == null) ?
        this.categorieprojet = new CategorieProjet(null, formData.libelle, this.user.username, null):
        this.categorieprojet.libelle = formData.libelle;
      this.categorieprojet.createBy = this.user.username;
      console.log(this.categorieprojet);
      if (this.checkDoublonElement(this.categorieprojet) === false) {

        this.categorieprojetService.save(this.categorieprojet).subscribe(
          (data: CategorieProjet) => {
            if(this.categorieprojet.id != null) {
              this.categorieprojetList.splice(this.indexOfElement(data.id), 1);
            }
            this.categorieprojetList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.categorieprojet = null;
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
    this.categorieprojet = null;
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

  openModification(categorieprojet: CategorieProjet) {
    this.makeForm(categorieprojet);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(categorieprojet: CategorieProjet) {
    this.categorieprojet = categorieprojet;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.categorieprojet.deleteBy = this.user.username;
    this.categorieprojetService.delete(this.categorieprojet).subscribe(
      (data: CategorieProjet) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.categorieprojet = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.categorieprojetList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.categorieprojetService.list().subscribe(
      (data: Array<CategorieProjet>) => {
        this.categorieprojetList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  error(categorieprojet: CategorieProjet): void {
    this.categorieprojet = categorieprojet;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ categorieprojet.libelle+'</b> ?</p>',
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
    while (i < this.categorieprojetList.length && rep === false) {
      if (this.categorieprojetList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(categorieprojet: CategorieProjet): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.categorieprojetList.length && rep === false) {
      if (this.categorieprojetList[i].libelle === categorieprojet.libelle && this.categorieprojetList[i].id != categorieprojet.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
