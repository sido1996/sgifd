import { Component, OnInit } from '@angular/core';
import { AppuiBudgetaireService } from '../../../../services/appui-budgetaire.service';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../../utils/token.storage';
import { ExerciceService } from '../../../../services/exercice.service';
import { NzMessageService } from 'ng-zorro-antd';
import { User } from '../../../../models/User';
import { Exercice } from '../../../../models/Exercice';
import { HttpErrorResponse } from '@angular/common/http';
import { AppuiBudgetaire } from '../../../../models/AppuiBudgetaire';
import { AppuiBudgetairePtfService } from '../../../../services/appui-budgetaire-ptf.service';

@Component({
  selector: 'app-list-appuis-budgetaires',
  templateUrl: './list-appuis-budgetaires.component.html',
  styleUrls: ['./list-appuis-budgetaires.component.css']
})
export class ListAppuisBudgetairesComponent implements OnInit {

  exercice: Exercice = null;

  exerciceList: Array<Exercice> = [];
  appuibudgetaireList: Array<AppuiBudgetaire> = [];

  user: User = null;
  filter: any;

  isChargment: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,
    private exerciceService: ExerciceService,
    private appuibudgetaireService: AppuiBudgetaireService,
    private appuibudgetaireptfService: AppuiBudgetairePtfService,
    private message: NzMessageService,
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getListExercice();
  }

  getListExercice(): void {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  makeListeAppuiBudgetaire(): void {
    this.isChargment = true;
    this.appuibudgetaireList = [];
    this.appuibudgetaireptfService.list(this.exercice.id).subscribe(
      (data: Array<AppuiBudgetaire>) => {
        this.appuibudgetaireList = data;
        this.isChargment = false;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  deleteAppuiBudgetaire(appuibudgetaire: AppuiBudgetaire): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression appui budgétaire N°Enreg. : <b>' + appuibudgetaire.id + '</b>' +
        '</b> de l\'année de collecte : <b>' + appuibudgetaire.annee.libelle + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneAppuiBudgetaire(appuibudgetaire),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneAppuiBudgetaire(appuibudgetaire: AppuiBudgetaire): void {
    appuibudgetaire.deleteBy = this.user.username;
    this.appuibudgetaireService.delete(appuibudgetaire).subscribe(
      (data: AppuiBudgetaire) => {
        //this.getList();
        this.appuibudgetaireList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      });
  }

  indexOfElement(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.appuibudgetaireList.length && rep === false) {
      if (this.appuibudgetaireList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  gotoNouveauAppuiBudgetaire() {
    this.router.navigate(['admin-ptf/nouveau-appuis-budgetaire']);
  }


  ouvrirModifier(id: number): void {
    this.router.navigate(['admin-ptf/modifier-appuis-budgetaire/' + id]);
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin-ptf/detail-appuis-budgetaire/' + id]);
  }

  /* Debut méthode format monnetaire */
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  /* Fin méthode format monnetaire */

}
