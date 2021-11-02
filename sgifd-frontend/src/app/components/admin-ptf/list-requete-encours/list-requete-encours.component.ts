import { Component, OnInit } from '@angular/core';
import { RequetePtf } from '../../../models/adminPtf/RequetePtf';
import { User } from '../../../models/User';
import { RequetePtfService } from '../../../services/requete-ptf.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../utils/token.storage';
import { NzModalService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';
import { RessourceExterieure } from '../../../models/RessourceExterieure';
import {ProjetProgrammeFinalise} from "../../../models/ProjetProgrammeFinalise";
import {RequeteFinancement} from "../../../models/RequeteFinancement";


@Component({
  selector: 'app-list-requete-encours',
  templateUrl: './list-requete-encours.component.html',
  styleUrls: ['./list-requete-encours.component.css']
})
export class ListRequeteEncoursComponent implements OnInit {

  requeteList: Array<RessourceExterieure> = [];
  //requeteList[]
  reqList

  filter: any;
  user: User = null;

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
    this.requetePtfService.listRequetePtfEncours().subscribe(
      (data: Array<RessourceExterieure>) => {
        this.requeteList = data;

        console.log(this.requeteList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  ouvrirDetail(id: number): void {
    this.requetePtfService.getByIdPRessource(id).subscribe(
      (data: RequeteFinancement) => {
       if(data != null) {
         this.router.navigate(['admin-ptf/detail/'+data.id]);
       }
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  /* Debut méthode format monnetaire */
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  /* Fin méthode format monnetaire */


  /* getNbreRlance(ressource: RessourceExterieureRequete): number {
    console.log(ressource);
    return ressource.relanceRequeteFinancements.length
  }

  getNbreRponse(ressource: RessourceExterieureRequete): number {
    console.log(ressource);
    return ressource.reponseRequeteFinancements.length
  }reponseRequeteFinancements */


}
