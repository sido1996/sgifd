import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Secteur} from "../../../../models/Secteur";
import {Router} from "@angular/router";
import {SecteurService} from "../../../../services/secteur.service";
import {Exercice} from "../../../../models/Exercice";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenStorage} from "../../../../utils/token.storage";
import {User} from "../../../../models/User";
import {NzModalService} from "ng-zorro-antd";
import {GrandSecteur} from "../../../../models/GrandSecteur";
import {GrandSecteurService} from "../../../../services/grand-secteur.service";
import {FindValues} from "../../../../payload/FindValues";

declare var $ :any;

@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrls: ['./secteur.component.css']
})
export class SecteurComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  secteur: Secteur;
  secteurList: Array<Secteur> = [];
  grandsecteurList: Array<GrandSecteur> = [];

  user: User = null;
  filter: any;
  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
              private router: Router,
              private secteurService: SecteurService,
              private grandsecteurService: GrandSecteurService,
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
    this.secteur = null;
    this.secteurList = [];
    this.getList();
    this.getListGrandSecteur();
  }

  makeForm(secteur: Secteur): void {
    this.validateForm = this.fb.group({
      libelle: [(secteur != null) ? secteur.libelle : null,
        [Validators.required]],
      grandSecteur: [(secteur != null && secteur.grandSecteur !=null) ? secteur.grandSecteur.id : null,
        [Validators.required]],
    });
    this.secteur = secteur;
  }


  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.secteur == null) ?
        this.secteur = new Secteur(null, formData.libelle, this.user.username, null,
          this.findValues.getObjectInList(formData.grandSecteur, this.grandsecteurList)):
        this.secteur.libelle = formData.libelle;
      this.secteur.createBy = this.user.username;
      this.secteur.grandSecteur = this.findValues.getObjectInList(formData.grandSecteur, this.grandsecteurList);
      console.log(this.secteur);
      if (this.checkDoublonElement(this.secteur) === false) {
        //this.secteurList.unshift(this.secteur);
        this.secteurService.save(this.secteur).subscribe(
          (data: Secteur) => {
            if(this.secteur.id != null) {
              this.secteurList.splice(this.indexOfElement(data.id), 1);
            }
            this.secteurList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.secteur = null;
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

  openModification(secteur: Secteur) {
    this.makeForm(secteur);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(secteur: Secteur) {
    this.secteur = secteur;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  getList(): void {
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
    this.secteur.deleteBy = this.user.username;
    this.secteurService.delete(this.secteur).subscribe(
      (data: Secteur) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.secteur = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.secteurList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  error(secteur: Secteur): void {
    this.secteur = secteur;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ secteur.libelle+'</b> ?</p>',
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
    while (i < this.secteurList.length && rep === false) {
      if (this.secteurList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(secteur: Secteur): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.secteurList.length && rep === false) {
      if (this.secteurList[i].libelle === secteur.libelle && this.secteurList[i].id != secteur.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }


  getListGrandSecteur(): void {
    this.grandsecteurService.list().subscribe(
      (data: Array<GrandSecteur>) => {
        this.grandsecteurList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }
}
