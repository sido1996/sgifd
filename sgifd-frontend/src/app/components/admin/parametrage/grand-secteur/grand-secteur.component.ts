import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GrandSecteur} from "../../../../models/GrandSecteur";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";
import {GrandSecteurService} from "../../../../services/grand-secteur.service";

@Component({
  selector: 'app-grand-secteur',
  templateUrl: './grand-secteur.component.html',
  styleUrls: ['./grand-secteur.component.css']
})
export class GrandSecteurComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  grandsecteur: GrandSecteur;
  grandsecteurList: Array<GrandSecteur> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private grandsecteurService: GrandSecteurService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.grandsecteur = null;
    this.grandsecteurList = [];
    this.getList();
  }

  makeForm(grandsecteur: GrandSecteur): void {
    this.validateForm = this.fb.group({
      libelle: [(grandsecteur != null) ? grandsecteur.libelle : null,
        [Validators.required]],
    });
    this.grandsecteur = grandsecteur;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.grandsecteur == null) ?
        this.grandsecteur = new GrandSecteur(null, formData.libelle, this.user.username, null):
        this.grandsecteur.libelle = formData.libelle;
      this.grandsecteur.createBy = this.user.username;
      console.log(this.grandsecteur);
      if (this.checkDoublonElement(this.grandsecteur) === false) {

        this.grandsecteurService.save(this.grandsecteur).subscribe(
          (data: GrandSecteur) => {
            if(this.grandsecteur.id != null) {
              this.grandsecteurList.splice(this.indexOfElement(data.id), 1);
            }
            this.grandsecteurList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.grandsecteur = null;
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
    this.grandsecteur = null;
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

  openModification(grandsecteur: GrandSecteur) {
    this.makeForm(grandsecteur);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(grandsecteur: GrandSecteur) {
    this.grandsecteur = grandsecteur;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.grandsecteur.deleteBy = this.user.username;
    this.grandsecteurService.delete(this.grandsecteur).subscribe(
      (data: GrandSecteur) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.grandsecteur = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.grandsecteurList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.grandsecteurService.list().subscribe(
      (data: Array<GrandSecteur>) => {
        this.grandsecteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  error(grandsecteur: GrandSecteur): void {
    this.grandsecteur = grandsecteur;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ grandsecteur.libelle+'</b> ?</p>',
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
    while (i < this.grandsecteurList.length && rep === false) {
      if (this.grandsecteurList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(grandsecteur: GrandSecteur): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.grandsecteurList.length && rep === false) {
      if (this.grandsecteurList[i].libelle === grandsecteur.libelle && this.grandsecteurList[i].id != grandsecteur.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
