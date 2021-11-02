import { Component, OnInit } from '@angular/core';
import {RequeteFinancement} from "../../../../models/RequeteFinancement";
import {User} from "../../../../models/User";
import {RequeteFinancementService} from "../../../../services/requete-financement.service";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzModalService} from "ng-zorro-antd";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-list-cloture',
  templateUrl: './list-cloture.component.html',
  styleUrls: ['./list-cloture.component.css']
})
export class ListClotureComponent implements OnInit {

  requeteList: Array<RequeteFinancement> = [];

  filter: any;
  user: User = null;

  constructor(
    private requeteFinancementService: RequeteFinancementService,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.requeteFinancementService.listClose().subscribe(
      (data: Array<RequeteFinancement>) => {
        this.requeteList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin/requete-financement/detail-requete/'+id]);
  }


  relancerRequete(requeteFinancement: RequeteFinancement): void {
    this.modalService.confirm({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la re-ouverture de la requête N° <b>'+ requeteFinancement.id+'</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType    : 'primary',
      nzCancelText: 'Non',
      nzOnOk      : () => this.ouvrirModifier(requeteFinancement),
      nzOnCancel: () => console.log('cancel')
    });
  }

  formatNumber(num: number): string {
    return num != null && num != undefined ? Math.round(num)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") : '0';
  }

  ouvrirModifier(requete: RequeteFinancement){

    requete.isStatusClose=false;

    this.requeteFinancementService.relancer(requete.id).subscribe(
      (data: Array<RequeteFinancement>) => {
        console.log(data);
        this.router.navigate(['admin/requete-financement/detail-requete/'+requete.id]);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });

  }


}
