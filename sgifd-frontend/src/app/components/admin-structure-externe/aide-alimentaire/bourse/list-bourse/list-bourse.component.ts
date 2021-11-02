import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../models/User';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../../../utils/token.storage';
import { NzModalService } from 'ng-zorro-antd';
import { AideCapitaleService } from '../../../../../services/services-structure-externe/aide-capitale.service';
import { AideCapitale } from '../../../../../models/AideCapitale';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-bourse',
  templateUrl: './list-bourse.component.html',
  styleUrls: ['./list-bourse.component.css']
})
export class ListBourseComponent implements OnInit {

  aideCapitaleList: Array<AideCapitale> = [];

  filter: any;
  user: User = null;

  constructor(
    private aideCapitaleService: AideCapitaleService,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService, ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.aideCapitaleService.listBourseFormation().subscribe(
      (data: Array<AideCapitale>) => {
        this.aideCapitaleList = data;
        console.log(this.aideCapitaleList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  ouvrirModifier(id: number): void {
    this.router.navigate(['admin-structure-externe/aide-secours-structure/modifier-bourse/' + id]);
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin-structure-externe/aide-secours-structure/detail-bourse/' + id]);
  }

  deleteIde(aideCapitale: AideCapitale): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de la bourse  Réf. N° <b>' + aideCapitale.id + '</b>' +
       '</b> année <b>' +aideCapitale.exercice.libelle + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneIde(aideCapitale),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneIde(aideCapitale: AideCapitale): void {
    aideCapitale.deleteBy = this.user.username;
    this.aideCapitaleService.delete(aideCapitale).subscribe(
      (data: AideCapitale) => {
        //this.getList();
        this.aideCapitaleList.splice(this.indexOfElement(data.id), 1);
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
    while (i < this.aideCapitaleList.length && rep === false) {
      if (this.aideCapitaleList[i].id === id) {
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
