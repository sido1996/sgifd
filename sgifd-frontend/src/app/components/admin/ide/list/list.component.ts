import { IdeService } from './../../../../services/ide.service';
import { Ide } from './../../../../models/Ide';
import { User } from './../../../../models/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from 'src/app/utils/token.storage';
import { NzModalService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ideList: Array<Ide> = [];

  filter: any;
  user: User = null;

  constructor(
    private ideService: IdeService,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService, ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.ideService.list().subscribe(
      (data: Array<Ide>) => {
        this.ideList = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  ouvrirModifier(id: number): void {
    this.router.navigate(['admin/ide/modifier-ide/' + id]);
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin/ide/detail-ide/' + id]);
  }
  deleteIde(ide: Ide): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de l\'ide Réf. : <b>' + ide.libelle + '</b> de l\'année <b>' +
        ide.anneeReception.libelle + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneIde(ide),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneIde(ide: Ide): void {
    ide.deleteBy = this.user.username;
    this.ideService.delete(ide).subscribe(
      (data: Ide) => {
        //this.getList();
        
        this.ideList.splice(this.indexOfElement(data.id), 1);
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
    while (i < this.ideList.length && rep === false) {
      if (this.ideList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }


}
