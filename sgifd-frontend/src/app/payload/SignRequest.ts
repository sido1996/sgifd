export class SignRequest {

  password: string;
  usernameOrEmail: string;

  constructor(password: string, usernameOrEmail: string) {
    this.password = password;
    this.usernameOrEmail = usernameOrEmail;
  }
}
