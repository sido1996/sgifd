import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {TokenStorage} from "../../../../utils/token.storage";
import {AxePrioritaireService} from "../../../../services/axe-prioritaire.service";
import {PiliersPagService} from "../../../../services/piliers-pag.service";
import {AxePrioritaire} from "../../../../models/AxePrioritaire";
import {Rapport} from "../../../../models/rapport";
import {RapportParams} from "../../../../models/rapport-params";
import {Role} from "../../../../models/Role";
import {RoleUserService} from "../../../../services/role-user.service";
import {UserService} from "../../../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserSystem} from "../../../../models/UserSystem";
import {FonctionnaliteUserService} from "../../../../services/fonctionnalite-user.service";
import {FonctionnaliteUser} from "../../../../models/FonctionnaliteUser";
import {RapportService} from "../../../../services/rapport.service";

@Component({
  selector: 'app-nouveau-rapport',
  templateUrl: './nouveau-rapport.component.html',
  styleUrls: ['./nouveau-rapport.component.css']
})
export class NouveauRapportComponent implements OnInit {

  validateForm: FormGroup;
  validateFormParam: FormGroup;
  isNotificationForm: boolean = false;
  isNotificationTable: boolean = false;
  submitted: boolean = false;
  typeNotificationForm: string;
  messageNotificationForm: string;
  typeNotificationTable: string;
  messageNotificationTable: string;

  rapport: Rapport = null;
  rapportParams: RapportParams[] = [];
  roleList: Array<Role> = [];
  fonctionaliteList: Array<FonctionnaliteUser> = [];
  userList: Array<UserSystem> = [];

  filter: any;

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NzModalService,
    private tokenStorage: TokenStorage,
    private axeprioritaireService: AxePrioritaireService,
    private pilierpagService: PiliersPagService,
    private roleUserService: RoleUserService,
    private userService: UserService,
    private rapportService: RapportService,
    private fonctionnaliteUserService: FonctionnaliteUserService,
  ) {
  }

  ngOnInit() {
    this.makeForm(null);
    this.makeFormParam(null);
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.getRoleAndUserList();
  }

  makeForm(rapport: Rapport): void {
    this.validateForm = this.fb.group({
      id: [(rapport != null) ? rapport.id : null],
      nom: [(rapport != null) ? rapport.nom : null,
        [Validators.required]],
      libelle: [(rapport != null) ? rapport.libelle : null,
        [Validators.required]],
      roles: [(rapport != null) ? rapport.roles : null],
      users: [(rapport != null) ? rapport.users : null],
      estAccessibleAvecRole: [(rapport != null) ? rapport.estAccessibleAvecRole : null],
      estAccessibleAvecUser: [(rapport != null) ? rapport.estAccessibleAvecUser : null],
    });
    this.rapport = rapport;
    this.rapportParams = (rapport != null) ? rapport.rapportParams : [];
  }

  makeFormParam(rapportParam: RapportParams): void {
    this.validateFormParam = this.fb.group({
      id: [(rapportParam != null) ? rapportParam.id : null],
      cle: [(rapportParam != null) ? rapportParam.cle : null,
        [Validators.required]],
      valeur: [(rapportParam != null) ? rapportParam.valeur : null],
      libelle: [(rapportParam != null) ? rapportParam.libelle : null],
      estChampsDeSaisie: [(rapportParam != null) ? rapportParam.estChampsDeSaisie : null],
      fonctionnaliteName: [(rapportParam != null) ? rapportParam.fonctionnaliteName : null],
      selectionRetourneId: [(rapportParam != null) ? rapportParam.selectionRetourneId : null],
      selectionRetourneCode: [(rapportParam != null) ? rapportParam.selectionRetourneCode : null],
      selectionRetourneLibelle: [(rapportParam != null) ? rapportParam.selectionRetourneLibelle : null],
    });
  }


  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }

  resetParamForm(): void {
    this.validateFormParam.reset();
  }

  ajouterParam(): void {
    const formData = this.validateFormParam.value;
    if (formData.id === null && this.rapportParams.findIndex(r =>
      r.cle === formData.cle) === -1) {
      this.rapportParams.push(formData);
    } else {
      this.rapportParams[this.rapportParams.findIndex(r =>
        (r.id === formData.id || r.cle === formData.cle))] =
        formData;
    }
    this.rapportParams = [...this.rapportParams];
    this.validateFormParam.reset();
  }

  getRoleAndUserList(): void {
    this.fonctionnaliteUserService.list().subscribe(
      (data: Array<FonctionnaliteUser>) => {
        this.fonctionaliteList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
    this.userService.list().subscribe(
      (data: Array<UserSystem>) => {
        this.userList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
    this.roleUserService.list().subscribe(
      (data: Array<Role>) => {
        this.roleList = data;
        console.log(this.roleList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  cancelForm(): void {
    this.isNotificationForm = false;
    this.isNotificationTable = false;
    this.submitted = false;
    this.rapportParams = [];
    this.validateForm.reset();
    this.validateFormParam.reset();
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }

  submitForm(): void {
    this.submitted = true;

    if (this.validateForm.valid === true && this.rapportParams.length > 0) {
      const rapport: Rapport = this.validateForm.value;
      rapport.rapportParams = this.rapportParams;

      this.rapportService.save(rapport).subscribe(
        (data: Rapport) => {
          this.notificationForm('success', 'Enregistrement effectué !');
          this.rapport = null;
          this.rapportParams = [];
          this.submitted = false;
          this.validateForm.reset();
          this.validateFormParam.reset();
        });
    } else {
      this.notificationForm('danger', ' Formulaire invalide !');
    }
  }

  deleteRapportParams(data): void {
    if (data.id != null) {
      this.rapportService.deleteParam(data).subscribe();
    }
    this.rapportParams.splice(this.rapportParams.findIndex(r =>
      (r.id === data.id)), 1);
    this.rapportParams = [...this.rapportParams];
  }

  selectToModify(data) {
    this.makeFormParam(data);
  }

}
