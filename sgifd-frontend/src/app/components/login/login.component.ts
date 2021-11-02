import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../utils/auth.service";
import { TokenStorage } from "../../utils/token.storage";
import { LoginRequestService } from "../../services/login-request.service";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "../../models/User";
import { UserSystem } from "../../models/UserSystem";
import { NzModalService } from "ng-zorro-antd";
import {UserService} from "../../services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  validateFormNewPassword: FormGroup;
  buttonText: string;
  typeNotificationForm: string;
  messageNotificationForm: string;
  isNotificationForm: boolean = false;

  user: UserSystem;

  isFirstLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private tokenStorage: TokenStorage,
    private loginRequestService: LoginRequestService,
    private modalService: NzModalService
  ) {
    // this.loginRequestService.header.next(this.h);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      usernameOrEmail: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false],
    });
    this.validateFormNewPassword = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
    this.tokenStorage.signOut();
    this.loginRequestService.setIsConnectedUser();
    this.loginRequestService.setCurrentUserConnected();
  }

  reinitialiser(): void {
    if (this.validateFormNewPassword.valid == true) {
      const formData = this.validateFormNewPassword.value;
      if(formData.password != formData.confirmPassword) {
        this.notificationForm(
          "danger",
          "Confirmation du mot de passe erronée !"
        );
      } else {
        this.userService
          .updateUserFisrtPassword(formData.password.toString())
          .subscribe(
            (data) => {
              console.log(data);
              if (data != null) {
                this.modalService.success({
                  nzTitle: "Bravo M/M(me) "+ this.user.firstName,
                  nzContent:
                    "<p> Votre mot de passe a été prise en compte. Désormais utilisé là pour " +
                    " votre accès à la plateforme SGIFD.</p>",
                  nzOkText: null,
                  nzCancelText: "Ok",
                  nzOnCancel: () => this.storeCurrentUser(),
                });
                this.notificationForm(
                  "info",
                  " Bravo M/M(me) !  " +
                  " Votre mot de passe a été prise en compte."
                );
              }
            },
            (error: HttpErrorResponse) => {
              this.notificationForm(
                "danger",
                "Erreur système. Veuillez réessayer ultérieurement !"
              );
            }
          );
      }
    } else {
      this.notificationForm(
        "danger",
        "Formulaire invalid. Veuillez renseigner tous les champs !"
      );
    }
  }

  connexion(): void {
    if (this.validateForm.valid == true) {
      const formData = this.validateForm.value;
      console.log(formData);
      this.authService
        .attemptAuth(formData.usernameOrEmail, formData.password)
        .subscribe(
          (data) => {
            console.log(data);

            if (data.success === false) {
              this.notificationForm("danger", "Login ou mot de passe incorrect !");
            } else {
              this.tokenStorage.saveToken(data.accessToken);
              console.log(this.tokenStorage.getToken());
              this.storeCurrentUser();
            }
          },
          (error) => {
            console.log(error);
            if(error == 'Bad credentials') {
              this.notificationForm("danger", "Login ou mot de passe incorrect !");
            } else {
              this.notificationForm(
                "danger",
                "Erreur système. Veuillez réessayer ultérieurement !"
              );
            }
          }
        );
    } else {
      this.notificationForm(
        "danger",
        "Formulaire invalids. Veuillez renseigner tous les champs !"
      );
    }
  }

  storeCurrentUser() {
    this.authService.retrieveCurrentUser().subscribe(
      (data) => {
        console.log(data);
        if (data === null) {
          this.modalService.info({
            nzTitle: "Désolé !",
            nzContent:
              "<p> Votre compte est bloqué. Veuillez consulter l'administrateur du" +
              " système en vue de l'activation de votre compte.</p>",
            nzOkText: null,
            nzCancelText: "Ok",
            nzOnCancel: () => console.log(),
          });
        } else {
          if (this.tokenStorage.saveCurrentUser(JSON.stringify(data)) == true) {
            this.user = JSON.parse(this.tokenStorage.getCurrentUser());
            console.log(this.user.roles[0].name);

            if(this.user.firstLogin == false) {
              if (this.user.roles[0].name == "ROLE_ADMIN") {
                location.href = "/admin";
              }
              if (this.user.roles[0].name == "ROLE_USER_STRUCTURE_EXTERNE") {
                location.href = "/admin-structure-externe";
              }
              if (this.user.roles[0].name == "ROLE_USER_PTF") {
                location.href = "/admin-ptf";
              }

            } else {
              this.modalService.info({
                nzTitle: "Bienvenue M/M(e) "+this.user.firstName,
                nzContent:
                  "<p> Veuillez réinitialiser votre mot de passe pour la toute première fois " +
                  " de votre accès à la plateforme SGIFD.</p>",
                nzOkText: null,
                nzCancelText: "Ok",
                nzOnCancel: () => console.log(),
              });
              this.notificationForm(
                "info",
                " Veuillez réinitialiser votre mot de passe pour la toute première fois " +
                " de votre accès à la plateforme SGIFD !"
              );
              this.isFirstLogin = true;
            }

          }
        }
        //window.l();
      },
      (error: HttpErrorResponse) => {
        // console.log('An error is occured ' + error.message);
      }
    );
  }

  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }
}
