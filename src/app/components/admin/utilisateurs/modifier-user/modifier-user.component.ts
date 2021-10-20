import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Structure } from '../../../../models/Structure';
import { ModuleUser } from '../../../../models/ModuleUser';
import { FonctionnaliteUser } from '../../../../models/FonctionnaliteUser';
import { ActionOfFonctionnalite } from '../../../../models/ActionOfFonctionnalite';
import { Role } from '../../../../models/Role';
import { AccreditatedUser } from '../../../../models/AccreditatedUser';
import { User } from '../../../../models/User';
import { FindValues } from '../../../../payload/FindValues';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ModuleUserService } from '../../../../services/module-user.service';
import { RoleUserService } from '../../../../services/role-user.service';
import { UserService } from '../../../../services/user.service';
import { ActionOfFonctionnaliteService } from '../../../../services/action-of-fonctionnalite.service';
import { StructureService } from '../../../../services/structure.service';
import { UserSystem } from '../../../../models/UserSystem';
import { HttpErrorResponse } from '@angular/common/http';
import { PtfService } from 'src/app/services/ptf.service';
import { Ptf } from 'src/app/models/Ptf';

@Component({
  selector: 'app-modifier-user',
  templateUrl: './modifier-user.component.html',
  styleUrls: ['./modifier-user.component.css']
})
export class ModifierUserComponent implements OnInit {

  paramKey: any;

  validateFormUser: FormGroup;
  validateFormAccreditatedUser: FormGroup;

  structureList: Array<Structure> = [];
  moduleUserList: Array<ModuleUser> = [];
  fonctionnaliteUserList: Array<FonctionnaliteUser> = [];
  actionOfFonctionnaliteList: Array<ActionOfFonctionnalite> = [];
  roleList: Array<Role> = [];
  ptfList: Ptf[] = [];

  userAction: UserSystem = null;
  moduleUserListSelected: Array<ModuleUser> = [];
  accreditatedUserSelected: AccreditatedUser = null;
  moduleUserSelected: ModuleUser = null;
  user: User = null;
  filter: any;
  private findValues: FindValues = new FindValues();

  isNotificationForm: boolean = false;

  accreditatedUserList: Array<AccreditatedUser> = [];

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,
    private activeRoute: ActivatedRoute,
    private moduleUserService: ModuleUserService,
    private roleUserService: RoleUserService,
    private userService: UserService,
    private message: NzMessageService,
    private ptfService: PtfService,
    private actionOfFonctionnaliteService: ActionOfFonctionnaliteService,
    private structureService: StructureService,
    ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.paramKey = this.activeRoute.snapshot.params['paramKey'];

    this.getModuleUserList();
    this.getStructureList();
    this.getRoleList();
    this.getPTFList();
    this.getActionOfFonctionnaliteList();
    this.makeFormAccreditatedUser(null);
    this.makeFormUser();

    this.userService.getById(this.paramKey).subscribe(
      (data: UserSystem) => {
        this.moduleUserListSelected = data.moduleUsers;
        this.accreditatedUserList = data.accreditatedUsers;
        this.userAction = data;
        console.log(data);
        this.makeFormUser();
      });


  }

  getPTFList(): void {
    this.ptfService.list().subscribe(
      (data: Array<Ptf>) => {
        this.ptfList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  submitForm(): void {

    if (this.validateFormUser.invalid) {
      this.modalService.error({
        nzTitle: 'Erreur',
        nzContent: '<p> Les informations renseignées sur le formulaire sont incomplètes. <br> ' +
          'Veuillez renseigner obligatoirement les champs se terminant par (*).</p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => console.log('cancel')
      });
    } else {
      const formData = this.validateFormUser.value;
console.log(formData);
      const newUser = formData;
      newUser.roles = [formData.roles];
      /*newUser.structureBeneficiaire = formData.structureBeneficiaire;
      newUser.ptf = formData.ptf;*/
      newUser.accreditatedUsers = this.accreditatedUserList;
      newUser.moduleUsers = this.moduleUserListSelected;

      this.userService.save(newUser).subscribe(
        (data: User) => {
          console.log(data);
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> Modification du compte de l\'utilisateur effectué avec succès.</p>',
            nzOkText: 'Ok',
            nzCancelText: null,
            nzOnOk: () => this.gotoListUtilisateurs()
          });
        },
        (error: HttpErrorResponse) => {
          this.createMessage('error', 'Echec de l\'enregistrement du projet !');
        });
    }
  }

  supprimerModule(i: number, modul: ModuleUser): void {
    this.moduleUserListSelected.splice(i, 1);
    for (let j = 0; j < modul.fonctionnaliteUsers.length; j++) {
      for (let k = 0; k < this.accreditatedUserList.length; k++) {
        if (this.accreditatedUserList[k].fonctionnaliteUser.id === modul.fonctionnaliteUsers[j].id) {
          this.accreditatedUserList.splice(k, 1);
        }
      }
    }
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  enregistrerModule(): void {
    //const i = this.indexOfElement(this.moduleUserSelected.id, this.moduleUserListSelected);
    const i = this.moduleUserListSelected.findIndex( m => m.id === this.moduleUserSelected.id);
    if(i == -1) {
      this.moduleUserListSelected.push(this.moduleUserSelected);
    }
    this.moduleUserSelected = null;
  }

  selectionnerModule(modul: ModuleUser): void {
    this.moduleUserSelected = modul;
    this.fonctionnaliteUserList = modul.fonctionnaliteUsers;
  }

  annulerSelection(): void {
    this.moduleUserSelected = null;
    this.fonctionnaliteUserList = [];
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }

  makeFormUser(): void {
    this.validateFormUser = this.fb.group({
      id: [this.userAction != null ? this.userAction.id : null],
      firstName: [this.userAction != null ? this.userAction.firstName : null,
      [Validators.required,]],
      lastName: [this.userAction != null ? this.userAction.lastName : null,
      [Validators.required,]],
      tel: [this.userAction != null ? this.userAction.tel : null,
      [Validators.required,]],
      email: [this.userAction != null ? this.userAction.email : null,
      [Validators.required,]],
      profession: [this.userAction != null ? this.userAction.profession : null,
      [Validators.required,]],
      roles: [this.userAction != null && this.userAction.roles != null
        && this.userAction.roles.length > 0 ? this.userAction.roles[0] : null,
      [Validators.required,]],
      structureBeneficiaire: [this.userAction != null
        && this.userAction.structureBeneficiaire != null ? this.userAction.structureBeneficiaire : null],
        ptf: [this.userAction != null
          && this.userAction.ptf != null ? this.userAction.ptf : null],
    });
  }

  enregistrerAccreditation(): void {
    const formData = this.validateFormAccreditatedUser.value;
    if (this.accreditatedUserSelected == null) {
      this.accreditatedUserSelected = new AccreditatedUser(null,
        this.findValues.getObjectInList(formData.fonctionnaliteUser, this.fonctionnaliteUserList),
        this.findValues.getObjectListInList(formData.actionOfFonctionnalites, this.actionOfFonctionnaliteList));
    } else {
      this.accreditatedUserSelected.actionOfFonctionnalites
      = this.findValues.getObjectListInList(formData.actionOfFonctionnalites, this.actionOfFonctionnaliteList);
      this.accreditatedUserSelected.fonctionnaliteUser
      = this.findValues.getObjectInList(formData.fonctionnaliteUser, this.fonctionnaliteUserList);
    }
    if (this.accreditatedUserSelected.id != null && this.accreditatedUserSelected != null) {
      const i = this.indexOfElement(this.accreditatedUserSelected.id, this.accreditatedUserList);
      this.accreditatedUserList.splice(i, i > -1 ? 1 : 0);
    }
    this.accreditatedUserList.push(this.accreditatedUserSelected);
    this.accreditatedUserSelected = null;
    this.makeFormAccreditatedUser(null);
  }

  annulerSelectionAccreditation(): void {
    this.accreditatedUserSelected = null;
    this.makeFormAccreditatedUser(null);
  }

  selectionnerAccreditation(accreditation: AccreditatedUser): void {
    this.accreditatedUserSelected = accreditation;
    this.makeFormAccreditatedUser(accreditation);
  }

  supprimerAccreditation(i: number): void {
    this.accreditatedUserSelected = null;
    this.makeFormAccreditatedUser(null);
    this.accreditatedUserList.splice(i, 1);
  }

  makeFormAccreditatedUser(accreditation: AccreditatedUser): void {
    this.validateFormAccreditatedUser = this.fb.group({
      fonctionnaliteUser: [accreditation != null ? accreditation.fonctionnaliteUser.id : null,
      [Validators.required,]],
      actionOfFonctionnalites: [accreditation != null ? this.findValues.getArrayId(accreditation.actionOfFonctionnalites) : null,
      [Validators.required,]],
    });
  }

  getActionOfFonctionnaliteList(): void {
    this.actionOfFonctionnaliteService.list().subscribe(
      (data: Array<ActionOfFonctionnalite>) => {
        this.actionOfFonctionnaliteList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  structureAppartenanceChange(structure: Structure): void {
    if (structure != null) {
      this.ptfList = [];
      this.validateFormUser.get('ptf').setValue(null);
    }
  }

  ptfChange(ptf: Ptf): void {
    if (ptf != null) {
      this.structureList = [];
      this.validateFormUser.get('structureBeneficiaire').setValue(null);
    }
  }

  getStructureList(): void {
    this.structureService.list().subscribe(
      (data: Array<Structure>) => {
        this.structureList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getModuleUserList(): void {
    this.moduleUserService.list().subscribe(
      (data: Array<ModuleUser>) => {
        this.moduleUserList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  getRoleList(): void {
    this.roleUserService.list().subscribe(
      (data: Array<Role>) => {
        this.roleList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  gotoListUtilisateurs() {
    this.router.navigate(['admin/utilisateurs/list-user']);
  }

  indexOfElement(id: number, listElement: Array<any>): number {
    let index = -1;
    let rep: boolean = false;
    index = listElement.findIndex( l=> l.id === id);

    return index;
  }

}
