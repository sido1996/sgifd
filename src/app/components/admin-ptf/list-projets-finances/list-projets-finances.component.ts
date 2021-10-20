import { Component, OnInit } from '@angular/core';
import { RequetePtf } from '../../../models/adminPtf/RequetePtf';
import { User } from '../../../models/User';
import { RequetePtfService } from '../../../services/requete-ptf.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../utils/token.storage';
import { NzModalService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';
import { Exercice } from '../../../models/Exercice';
import { ExerciceService } from '../../../services/exercice.service';
import { ProjetFinance } from '../../../models/adminPtf/ProjetFinance';

@Component({
  selector: 'app-list-projets-finances',
  templateUrl: './list-projets-finances.component.html',
  styleUrls: ['./list-projets-finances.component.css']
})
export class ListProjetsFinancesComponent implements OnInit {


  exercice: Exercice = null;

  exerciceList: Array<Exercice> = [];

  requeteList: Array<ProjetFinance> = [];
  //requeteList[]
  reqList

  filter: any;
  user: User = null;

  isChargment: boolean = false;

  constructor(
    private requetePtfService: RequetePtfService,
    private router: Router,
    private exerciceService: ExerciceService,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {

    this.getListExercice();
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    //this.getList();
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
  //this.user.ptf.id
  makeListeProjet(): void {
    this.isChargment = true;
    console.log(this.exercice.id);
    this.requetePtfService.listProjetFinancesAnnuel(this.exercice.id).subscribe(
      (data) => {
        this.reqList = data;
        this.requeteList = [];
        let i = 0;
        while (i < this.reqList.length) {
          //this.requeteList.unshift(JSON.stringify(this.reqList[i]));
          let r=new ProjetFinance(
            this.reqList[i][0],
            this.reqList[i][1],
            this.reqList[i][2],
             this.reqList[i][3],
            this.reqList[i][4],
            this.reqList[i][5],
            this.reqList[i][6],
          );

          this.requeteList.unshift(r);

          i++;
        }
        this.isChargment = false;
        console.log(this.requeteList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.isChargment = false;
      });
  }



  ouvrirDetail(idP: number): void {
    this.router.navigate(['admin-ptf/detail-projets-finances/'+idP]);
  }

  /* Debut méthode format monnetaire */
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  /* Fin méthode format monnetaire */

}
