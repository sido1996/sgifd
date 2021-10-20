import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../utils/auth.service";
import {ExerciceService} from "../../../../services/exercice.service";
import {Exercice} from "../../../../models/Exercice";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../../models/User";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzModalService} from "ng-zorro-antd";

declare var $ :any;

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.css']
})
export class ExerciceComponent implements OnInit {

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

  exercice: Exercice;
  exerciceList: Array<Exercice> = [];

  filter: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private exerciceService: ExerciceService,
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
    this.exercice = null;
    this.exerciceList = [];
    this.getList();
  }

  makeForm(exercice: Exercice): void {
    this.validateForm = this.fb.group({
      annee: [(exercice != null) ? exercice.libelle : null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
    this.exercice = exercice;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      (this.exercice == null) ?
      this.exercice = new Exercice(null, formData.annee, this.user.username, null):
      this.exercice.libelle = formData.annee;
      this.exercice.createBy = this.user.username;
      console.log(this.exercice);
      if (this.checkDoublonElement(this.exercice) === false) {
        //this.exerciceList.unshift(this.exercice);
        this.exerciceService.save(this.exercice).subscribe(
          (data: Exercice) => {
            if(this.exercice.id != null) {
              this.exerciceList.splice(this.indexOfElement(data.id), 1);
            }
            this.exerciceList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.exercice = null;
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
    this.exercice = null;
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

  openModification(exercice: Exercice) {
    this.makeForm(exercice);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(exercice: Exercice) {
    this.exercice = exercice;
    console.log('suppression');
  }

  get f() { return this.validateForm.controls; }

  getList(): void {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  deleteElement() {
    this.exercice.deleteBy = this.user.username;
    this.exerciceService.delete(this.exercice).subscribe(
      (data: Exercice) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.exercice = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.exerciceList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  error(exercice: Exercice): void {
    this.exercice = exercice;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>'+ exercice.libelle+'</b> ?</p>',
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
    while (i < this.exerciceList.length && rep === false) {
      if (this.exerciceList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  checkDoublonElement(exercice: Exercice): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.exerciceList.length && rep === false) {
      if (this.exerciceList[i].libelle === exercice.libelle && this.exerciceList[i].id != exercice.id) {
        rep = true;
      }
      i ++;
    }
    return rep;
  }

}
