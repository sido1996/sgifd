import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeFondSpecifique} from "../../../../models/TypeFondSpecifique";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {HttpErrorResponse} from "@angular/common/http";
import {TypeFondSpecifiqueService} from "../../../../services/type-fond-specifique.service";

@Component({
  selector: 'app-type-fond-specifique',
  templateUrl: './type-fond-specifique.component.html',
  styleUrls: ['./type-fond-specifique.component.css']
})
export class TypeFondSpecifiqueComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  typefondspecifique: TypeFondSpecifique;
  typefondspecifiqueList: Array<TypeFondSpecifique> = [];

  user: User = null;
  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private tokenStorage: TokenStorage,
              private typefondspecifiqueService: TypeFondSpecifiqueService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.typefondspecifique = null;
    this.typefondspecifiqueList = [];
    this.getList();
  }

  makeForm(typefondspecifique: TypeFondSpecifique): void {
    this.validateForm = this.fb.group({
      libelle: [(typefondspecifique != null) ? typefondspecifique.libelle : null,
        [Validators.required]],
    });
    this.typefondspecifique = typefondspecifique;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.typefondspecifique == null) ?
        this.typefondspecifique = new TypeFondSpecifique(null, formData.libelle, this.user.username, null):
        this.typefondspecifique.libelle = formData.libelle;
      this.typefondspecifique.createBy = this.user.username;
      console.log(this.typefondspecifique);
      if (this.checkDoublonElement(this.typefondspecifique) === false) {

        this.typefondspecifiqueService.save(this.typefondspecifique).subscribe(
          (data: TypeFondSpecifique) => {
            if(this.typefondspecifique.id != null) {
              this.typefondspecifiqueList.splice(this.indexOfElement(data.id), 1);
            }
            this.typefondspecifiqueList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.typefondspecifique = null;
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
    this.typefondspecifique = null;
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

  openModification(typefondspecifique: TypeFondSpecifique) {
    this.makeForm(typefondspecifique);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(typefondspecifique: TypeFondSpecifique) {
    this.typefondspecifique = typefondspecifique;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  deleteElement() {
    this.typefondspecifique.deleteBy = this.user.username;
    this.typefondspecifiqueService.delete(this.typefondspecifique).subscribe(
      (data: TypeFondSpecifique) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.typefondspecifique = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.typefondspecifiqueList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  getList(): void {
    this.typefondspecifiqueService.list().subscribe(
      (data: Array<TypeFondSpecifique>) => {
        this.typefondspecifiqueList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  error(typefondspecifique: TypeFondSpecifique): void {
    this.typefondspecifique = typefondspecifique;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ typefondspecifique.libelle+'</b> ?</p>',
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
    while (i < this.typefondspecifiqueList.length && rep === false) {
      if (this.typefondspecifiqueList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(typefondspecifique: TypeFondSpecifique): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.typefondspecifiqueList.length && rep === false) {
      if (this.typefondspecifiqueList[i].libelle === typefondspecifique.libelle && this.typefondspecifiqueList[i].id != typefondspecifique.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
