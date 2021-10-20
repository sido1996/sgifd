import { Component, OnInit } from '@angular/core';
import { RequetePtf } from '../../../models/adminPtf/RequetePtf';
import { User } from '../../../models/User';
import { RequetePtfService } from '../../../services/requete-ptf.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../utils/token.storage';
import { NzModalService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';
import { RessourceExterieure } from '../../../models/RessourceExterieure';

@Component({
  selector: 'app-list-requete-clotures',
  templateUrl: './list-requete-clotures.component.html',
  styleUrls: ['./list-requete-clotures.component.css']
})
export class ListRequeteCloturesComponent implements OnInit {

  requeteList: Array<RessourceExterieure> = [];
  //requeteList[]
  reqList

  filter: any;
  user: User = null;
  isChargment: boolean = false;

  constructor(
    private requetePtfService: RequetePtfService,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.getList();
  }

  getList(): void {
    this.requetePtfService.listRequetePtfClotures().subscribe(
      (data: Array<RessourceExterieure>) => {
        this.requeteList = data;

        console.log(this.requeteList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }



  ouvrirDetail(id: number): void {
    this.router.navigate(['admin-ptf/detail-clotures/'+id]);
  }

  /* Debut méthode format monnetaire */
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  /* Fin méthode format monnetaire */


 /*  getNbreRlance(ressource: RessourceExterieureRequete): number {
    return ressource.relanceRequeteFinancements.length
  }

  getNbreRponse(ressource: RessourceExterieureRequete): number {
    return ressource.reponseRequeteFinancements.length
  } */



}
