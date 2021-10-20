import { Component, OnInit } from '@angular/core';
import { CooperationDecentralisee } from '../../../../models/CooperationDecentralisee';
import { User } from '../../../../models/User';
import { CooperationDecentraliseeService } from '../../../../services/services-structure-externe/cooperation-decentralisee.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzModalService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  cooperationdecentraliseeList: Array<CooperationDecentralisee> = [];

  filter: any;
  user: User = null;

  constructor(
    private cooperationDecentraliseeService: CooperationDecentraliseeService,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.cooperationDecentraliseeService.list().subscribe(
      (data: Array<CooperationDecentralisee>) => {
        this.cooperationdecentraliseeList = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  ouvrirModifier(id: number): void {
    this.router.navigate(['admin-structure-externe/cooperation-decentralisee-structure/modifier/' + id]);
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin-structure-externe/cooperation-decentralisee-structure/detail/' + id]);
  }

  deleteCooperationDecentralisee(cooperationDecentralisee: CooperationDecentralisee): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de la Cooperation Decentralisee de Réf. <b>' + cooperationDecentralisee.reference + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneCooperationDecentralisee(cooperationDecentralisee),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneCooperationDecentralisee(cooperation: CooperationDecentralisee): void {
    cooperation.deleteBy = this.user.username;
    this.cooperationDecentraliseeService.delete(cooperation).subscribe(
      (data: CooperationDecentralisee) => {
        //this.getList();
        this.cooperationdecentraliseeList.splice(this.indexOfElement(data.id), 1);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      }
    );
  }

  indexOfElement(id: number): number {
    let index = -1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.cooperationdecentraliseeList.length && rep === false) {
      if (this.cooperationdecentraliseeList[i].id === id) {
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
