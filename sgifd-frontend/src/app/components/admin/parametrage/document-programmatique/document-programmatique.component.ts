import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pays} from "../../../../models/Pays";
import {User} from "../../../../models/User";
import {FindValues} from "../../../../payload/FindValues";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzModalService} from "ng-zorro-antd";
import {HttpErrorResponse} from "@angular/common/http";
import {DocumentProgrammatique} from "../../../../models/document-programmatique";
import {DocumentProgrammatiqueService} from "../../../../services/document-programmatique.service";

@Component({
  selector: 'app-document-programmatique',
  templateUrl: './document-programmatique.component.html',
  styleUrls: ['./document-programmatique.component.css']
})
export class DocumentProgrammatiqueComponent implements OnInit {

  validateForm: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;
  btnTitle: string;

  documentProgrammatique: DocumentProgrammatique = null;
  documentProgrammatiqueList: Array<DocumentProgrammatique> = [];

  filter: any;
  user: User = null;
  private findValues: FindValues = new FindValues();

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorage,
              private modalService: NzModalService,
              private documentProgrammatiqueService: DocumentProgrammatiqueService) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.btnTitle = 'Enregistrer';
    this.documentProgrammatique = null;
    this.documentProgrammatiqueList = [];
    this.getList();
  }

  makeForm(documentProgrammatique: DocumentProgrammatique): void {
    this.validateForm = this.fb.group({
      id: [(documentProgrammatique != null) ? documentProgrammatique.id : null],
      libelle: [(documentProgrammatique != null) ? documentProgrammatique.libelle : null,
        [Validators.required,]],
      code: [(documentProgrammatique != null) ? documentProgrammatique.code : null,
        [Validators.required,]],
    });
    this.documentProgrammatique = documentProgrammatique;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      this.documentProgrammatique = formData;
      this.documentProgrammatique.createBy = this.user.username;
      console.log(this.documentProgrammatique);
      if (this.checkDoublonElement(this.documentProgrammatique) === false) {
        //this.secteurList.unshift(this.secteur);
        this.documentProgrammatiqueService.save(this.documentProgrammatique).subscribe(
          (data: DocumentProgrammatique) => {
            if (this.documentProgrammatique.id != null) {
              this.documentProgrammatiqueList.splice(this.indexOfElement(data.id), 1);
            }
            this.documentProgrammatiqueList.unshift(data);
            this.notificationForm('success', 'Enregistrement effectué !');
            this.notificationTable('info', 'Nouvel enregistrement effectué !');
            this.documentProgrammatique = null;
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
    this.documentProgrammatique = null;
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

  openModification(documentProgrammatique: DocumentProgrammatique) {
    //console.log(documentProgrammatique);
    this.makeForm(documentProgrammatique);
    this.btnTitle = 'Modifier';
  }

  openDeleteDialog(documentProgrammatique: DocumentProgrammatique) {
    this.documentProgrammatique = documentProgrammatique;
    console.log('suppression');
  }

  get f() {
    return this.validateForm.controls;
  }

  deleteElement() {
    this.documentProgrammatique.deleteBy = this.user.username;
    this.documentProgrammatiqueService.delete(this.documentProgrammatique).subscribe(
      (data: DocumentProgrammatique) => {
        //this.getList();
        this.closeNotificationForm();
        this.notificationTable('info', 'Suppression effectuée avec succès !');
        this.documentProgrammatique = null;
        this.submitted = false;
        this.btnTitle = 'Enregistrer';
        this.validateForm.reset();
        this.documentProgrammatiqueList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  error(documentProgrammatique: DocumentProgrammatique): void {
    this.documentProgrammatique = documentProgrammatique;
    this.modalService.error({
      nzTitle: 'Suppression',
      nzContent: '<p> Confirmez-vous la suppression de <b>' + documentProgrammatique.libelle +' </b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteElement(),
      nzCancelText: 'Non',
      nzOnCancel: () => this.cancelForm()
    });
  }

  getList(): void {
    this.documentProgrammatiqueService.list().subscribe(
      (data: Array<DocumentProgrammatique>) => {
        this.documentProgrammatiqueList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  indexOfElement(id: number): number {
    let index = -1;
    index = this.documentProgrammatiqueList.findIndex(d => d.id == id);
    return index;
  }

  checkDoublonElement(documentProgrammatique: DocumentProgrammatique): boolean {
    let rep: boolean = false;
    let i = 0;
    while (i < this.documentProgrammatiqueList.length && rep === false) {
      if (this.documentProgrammatiqueList[i].libelle === documentProgrammatique.libelle && this.documentProgrammatiqueList[i].id != documentProgrammatique.id) {
        rep = true;
      }
      i++;
    }
    return rep;
  }

}
