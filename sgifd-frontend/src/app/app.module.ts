import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { WINDOW_PROVIDERS } from './utils/window';
import { JwtInterceptor } from './utils/JwtInterceptor';
import { ErrorInterceptor } from './utils/ErrorInterceptor';
import { AuthService } from './utils/auth.service';
import { TokenStorage } from './utils/token.storage';
import { DefaultService } from './services/default.service';
import { UserService } from './services/user.service';
import { RoleGuardService } from './utils/role-guard.service';
import { LoginRequestService } from './services/login-request.service';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PasswordRequestComponent } from './components/password-request/password-request.component';
import { MonCompteComponent } from './components/mon-compte/mon-compte.component';
import {AdminGuardService} from "./utils/admin-guard.service";
import {AdminPtfGuardService} from "./utils/admin-ptf-guard.service";
import {AdminStructureGuardService} from "./utils/admin-structure-guard.service";

/*const appRoutes: Routes = [
{
  path: '',
    redirectTo: '/login',
  pathMatch: 'full'
},

{path: 'login', component: LoginComponent},

{path: 'admin', component: AdminComponent},


  {path: '**', component: FourOhFourComponent}
];*/

@NgModule({
  declarations: [
    AppComponent,
    FourOhFourComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    PasswordRequestComponent,
    MonCompteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgZorroAntdModule

    /*  RouterModule.forRoot(
        appRoutes,
        // {enableTracing: true} // <-- debugging purposes only
      ),
    */
  ],
  providers: [
    WINDOW_PROVIDERS,
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService,
    TokenStorage,
    DefaultService,
    UserService,
    RoleGuardService,
    AdminGuardService,
    AdminPtfGuardService,
    AdminStructureGuardService,
    LoginRequestService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
