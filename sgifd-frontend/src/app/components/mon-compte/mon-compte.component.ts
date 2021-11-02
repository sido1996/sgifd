import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {TokenStorage} from "../../utils/token.storage";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {UserSystem} from "../../models/UserSystem";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {

  validateFormUser: FormGroup;

  user: UserSystem = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorage,
    private userService: UserService,
    private modalService: NzModalService,
    private message: NzMessageService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeFormUser();
  }


  makeFormUser(): void {
    this.validateFormUser = this.fb.group({
      firstName: [this.user != null ? this.user.firstName : null,
        [Validators.required,]],
      lastName: [this.user != null ? this.user.lastName : null,
        [Validators.required,]],
      tel: [this.user != null ? this.user.tel : null,
        [Validators.required,]],
      email: [this.user != null ? this.user.email : null,
        [Validators.required,]],
      password: [this.user != null ? "Test@2021" : null, [Validators.required, Validators.maxLength(20),
        Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[-+!*$@%_])([-+!*$@%_\\w]{8,15})$')]],
      username: [this.user != null ? this.user.username : null,
        [Validators.required, Validators.minLength(4)]],
      confirmationpwd: [this.user != null ? "Test@2021" : null, [Validators.required,  Validators.maxLength(20),
        Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[-+!*$@%_])([-+!*$@%_\\w]{8,15})$')]],
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
      if (formData.confirmationpwd != formData.password) {
        this.modalService.error({
          nzTitle: 'Erreur',
          nzContent: '<p> Erreur dans la confirmation du mot de passe.</p>',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => console.log('cancel')
        });
      } else {
        this.user.createBy = this.user.username;
        this.user.email = formData.email;
        this.user.firstName = formData.firstName;
        this.user.lastName = formData.lastName;
        this.user.tel = formData.tel;

        if(formData.password != "Test@2021"){
          this.user.password = formData.password;

        }


        this.userService.updateAccount(this.user).subscribe(
          (data: UserSystem) => {
            this.modalService.info({
              nzTitle: 'Information',
              nzContent: '<p> La mise à jour de votre compte est effectuée avec succès.</p>',
              nzOkText: 'Ok',
              nzCancelText: null,
              nzOnOk: () => this.initiliseAcount(data)
            });
          },
          (error: HttpErrorResponse) => {
            this.createMessage('error', 'Echec de l\'enregistrement du projet !');
          });
      }
    }
  }

  initiliseAcount(user: UserSystem): void {
    if (this.tokenStorage.saveCurrentUser(JSON.stringify(user)) == true) {
      window.location.reload();
    }
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  navigateAdminUrl(): void {
    this.router.navigate(['admin']);
}

}
