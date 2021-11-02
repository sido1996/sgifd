import { Component, OnInit } from '@angular/core';
import {RequeteFinancementService} from "../../../../services/requete-financement.service";
import {Ptf} from "../../../../models/Ptf";
import {HttpErrorResponse} from "@angular/common/http";
import {TypeStructure} from "../../../../models/TypeStructure";
import {RequeteFinancement} from "../../../../models/RequeteFinancement";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {Arrondissement} from "../../../../models/Arrondissement";
import {User} from "../../../../models/User";
import {TokenStorage} from "../../../../utils/token.storage";

@Component({
  selector: 'app-list-requete',
  templateUrl: './list-requete.component.html',
  styleUrls: ['./list-requete.component.css']
})
export class ListRequeteComponent implements OnInit {

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
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.getList();
  }

  getList(): void {
    this.requeteFinancementService.list().subscribe(
      (data: Array<RequeteFinancement>) => {
        this.requeteList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  ouvrirModifier(id: number): void {
    this.router.navigate(['admin/requete-financement/modifier-requete/'+id]);
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin/requete-financement/detail-requete/'+id]);
  }

  deleteRequete(requeteFinancement: RequeteFinancement): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de la requête de financement N° <b>'+ requeteFinancement.id+'</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType    : 'danger',
      nzCancelText: 'Non',
      nzOnOk      : () => this.deleteOneRequete(requeteFinancement),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneRequete(req: RequeteFinancement): void {
    req.deleteBy = this.user.username;
    this.requeteFinancementService.delete(req).subscribe(
      (data: RequeteFinancement) => {
        //this.getList();
        this.requeteList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  formatNumber(num: number): string {
    return num != null && num != undefined ? Math.round(num)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") : '0';
  }

  indexOfElement(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.requeteList.length && rep === false) {
      if (this.requeteList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

}
