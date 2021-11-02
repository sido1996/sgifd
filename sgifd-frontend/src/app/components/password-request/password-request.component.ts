import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserSystem} from "../../models/UserSystem";
import {Router} from "@angular/router";
import {AuthService} from "../../utils/auth.service";
import {TokenStorage} from "../../utils/token.storage";
import {LoginRequestService} from "../../services/login-request.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-password-request',
  templateUrl: './password-request.component.html',
  styleUrls: ['./password-request.component.css']
})
export class PasswordRequestComponent implements OnInit {

  validateForm: FormGroup;
  buttonText: string;
  typeNotificationForm: string;
  messageNotificationForm: string;
  isNotificationForm: boolean = false;

  user: UserSystem;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorage,
    private loginRequestService: LoginRequestService,
  ) {
    // this.loginRequestService.header.next(this.h);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      usernameOrEmail: [null, [Validators.required]
      ],
    });
    this.tokenStorage.signOut();
  }

  connexion(): void {
    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      console.log(formData);
      this.authService.resetAccount(formData.usernameOrEmail).subscribe(
        (data: any) => {
          console.log(data);
          if (data.code === 1) {
            this.notificationForm('success', 'Votre mot de passe a été réinitialisé et envoyé à votre adresse mail !');
          } else {
            this.notificationForm('danger', 'Aucune adresse mail ne correspond !');
          }
        },
        (error: HttpErrorResponse) => {
          this.notificationForm('danger', 'Erreur système. Veuillez réessayer ultérieurement !');
        }
      );
    } else {
      this.notificationForm('danger', 'Formulaire invalid. Veuillez renseigner tous les champs !');
    }

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
