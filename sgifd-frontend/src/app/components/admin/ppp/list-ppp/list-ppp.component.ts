import { Component, OnInit } from '@angular/core';
import { PPP } from '../../../../models/PPP';
import { User } from '../../../../models/User';
import { PPPService } from '../../../../services/ppp.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzModalService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-ppp',
  templateUrl: './list-ppp.component.html',
  styleUrls: ['./list-ppp.component.css']
})
export class ListPppComponent implements OnInit {

  pppList: Array<PPP> = [];

  filter: any;
  user: User = null;

  constructor(
    private pppService: PPPService,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.pppService.list().subscribe(
      (data: Array<PPP>) => {
        this.pppList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  ouvrirModifier(id: number): void {
    this.router.navigate(['admin/ppp/modifier-ppp/'+id]);
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin/ppp/detail-ppp/'+id]);
  }

  deletePPP(ppp: PPP): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression du ppp nommée <b>'+ ppp.libelle+'</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType    : 'danger',
      nzCancelText: 'Non',
      nzOnOk      : () => this.deleteOneRequete(ppp),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneRequete(req: PPP): void {
    req.deleteBy = this.user.username;
    this.pppService.delete(req).subscribe(
      (data: PPP) => {
        //this.getList();
        this.pppList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  indexOfElement(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.pppList.length && rep === false) {
      if (this.pppList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

  // Debut méthode format monnetaire
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  // Fin méthode format monnetaire

}
