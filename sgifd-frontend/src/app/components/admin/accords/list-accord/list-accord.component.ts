import { Component, OnInit } from '@angular/core';
import {RequeteFinancement} from "../../../../models/RequeteFinancement";
import {User} from "../../../../models/User";
import {RequeteFinancementService} from "../../../../services/requete-financement.service";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzModalService} from "ng-zorro-antd";
import {HttpErrorResponse} from "@angular/common/http";
import {Accord} from "../../../../models/Accord";
import {AccordService} from "../../../../services/accord.service";

@Component({
  selector: 'app-list-accord',
  templateUrl: './list-accord.component.html',
  styleUrls: ['./list-accord.component.css']
})
export class ListAccordComponent implements OnInit {

  accordList: Array<Accord> = [];

  filter: any;
  user: User = null;

  constructor(
    private accordService: AccordService,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.accordService.list().subscribe(
      (data: Array<Accord>) => {
        this.accordList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  ouvrirModifier(id: number): void {
    this.router.navigate(['admin/accords/modifier-accord/'+id]);
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin/accords/detail-accord/'+id]);
  }

  deleteAccord(accord: Accord): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de l\'accord Réf. : <b>'+ accord.reference+'</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType    : 'danger',
      nzCancelText: 'Non',
      nzOnOk      : () => this.deleteOneAccord(accord),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneAccord(accord: Accord): void {
    accord.deleteBy = this.user.username;
    this.accordService.delete(accord).subscribe(
      (data: Accord) => {
        //this.getList();
        this.accordList.splice(this.indexOfElement(data.id), 1);
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
    while (i < this.accordList.length && rep === false) {
      if (this.accordList[i].id === id) {
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
