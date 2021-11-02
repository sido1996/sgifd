import { Component, OnInit } from '@angular/core';
import { ProjetFinance } from '../../../models/adminPtf/ProjetFinance';
import { RequetePtfService } from '../../../services/requete-ptf.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../utils/token.storage';
import { NzModalService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';
import { RessourceExterieure } from '../../../models/RessourceExterieure';
import { FinanceAnnuelProjet } from '../../../models/adminPtf/FinanceAnnuelProjet';
import { AppuiBudgetairePtfService } from '../../../services/appui-budgetaire-ptf.service';
import { AppuiBudgetaire } from '../../../models/AppuiBudgetaire';

@Component({
  selector: 'app-admin-ptf-menu',
  templateUrl: './admin-ptf-menu.component.html',
  styleUrls: ['./admin-ptf-menu.component.css']
})
export class AdminPtfMenuComponent implements OnInit {


  projetFinances: Array<ProjetFinance> = [];
  reqList

  listFinancementProjet: Array<FinanceAnnuelProjet> = [];

  requeteEncours: Array<RessourceExterieure> = [];

  requeteClotures: Array<RessourceExterieure> = [];

  appuibudgetaireList: Array<AppuiBudgetaire> = [];

  filter: any;
  isChargment: boolean = false;

  constructor(
    private requetePtfService: RequetePtfService,
    private router: Router,
    private tokenStorage: TokenStorage,
    private appuibudgetaireptfService: AppuiBudgetairePtfService,
    private modalService: NzModalService,) { }

  ngOnInit() {
    this.getProjetFinances();
    this.getRequtesEncours()
    this.getRequtesClotures()
    this.getListFinancementProjet()
    this.makeListeAppuiBudgetaire();
  }


  getProjetFinances(): void {
    this.requetePtfService.nombreProjetFinances().subscribe(
      (data) => {
        this.reqList = data;
        let i = 0;
        while (i < this.reqList.length) {
          let r=new ProjetFinance(
            this.reqList[i][0],
            this.reqList[i][1],
            this.reqList[i][2],
             this.reqList[i][3],
            this.reqList[i][4],
            this.reqList[i][5],
            this.reqList[i][6],
          );

          this.projetFinances.unshift(r);

          i++;
        }

        console.log(this.projetFinances);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }



  getRequtesEncours(): void {
    this.requetePtfService.listRequetePtfEncours().subscribe(
      (data: Array<RessourceExterieure>) => {
        this.requeteEncours = data;

        console.log(this.requeteEncours);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  getRequtesClotures(): void {
    this.requetePtfService.listRequetePtfClotures().subscribe(
      (data: Array<RessourceExterieure>) => {
        this.requeteClotures = data;

        console.log(this.requeteClotures);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }



  getListFinancementProjet(): void {
    this.requetePtfService.listFinancementProjet().subscribe(
      (data) => {
        this.reqList = data;
        let i = 0;
        while (i < this.reqList.length) {
          let r=new FinanceAnnuelProjet()
            r.montantRessourceDecaisser = this.reqList[i][0];
            r.montantRessourceProgrammer = this.reqList[i][1];
            r.deviseMonnaie = this.reqList[i][2];
            r.natureFinancement = this.reqList[i][3];
            r.id = this.reqList[i][4];
            r.reference = this.reqList[i][5];
            r.libelle = this.reqList[i][6];


          this.listFinancementProjet.unshift(r);

          i++;
        }

        console.log(this.listFinancementProjet);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  getTotalFinancementProjet(): number {
    let cout = 0;
    this.listFinancementProjet.forEach(r => {
      cout = cout + r.montantRessourceDecaisser;
    });
    return cout;
  }



  makeListeAppuiBudgetaire(): void {
    this.isChargment = true;
    //this.appuibudgetaireList = [];
    this.appuibudgetaireptfService.listFull().subscribe(
      (data: Array<AppuiBudgetaire>) => {
        this.appuibudgetaireList = data;
        this.isChargment = false;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  getTotalMontantAppuiBudgetaire(): number {
    let cout = 0;
    this.appuibudgetaireList.forEach(r => {
      cout = cout + r.montant;
    });
    return cout;
  }


  // Debut méthode format monnetaire
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }



}
