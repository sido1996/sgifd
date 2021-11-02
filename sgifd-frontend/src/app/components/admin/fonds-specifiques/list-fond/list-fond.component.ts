import { Component, OnInit } from '@angular/core';
import {FondSpecifique} from "../../../../models/FondSpecifique";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzModalService} from "ng-zorro-antd";
import {HttpErrorResponse} from "@angular/common/http";
import {FondSpecifiqueService} from "../../../../services/fond-specifique.service";

@Component({
  selector: 'app-list-fond',
  templateUrl: './list-fond.component.html',
  styleUrls: ['./list-fond.component.css']
})
export class ListFondComponent implements OnInit {

  fondspecifiqueList: Array<FondSpecifique> = [];

  filter: any;
  user: User = null;

  constructor(
    private fondspecifiqueService: FondSpecifiqueService,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.fondspecifiqueService.list().subscribe(
      (data: Array<FondSpecifique>) => {
        this.fondspecifiqueList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  ouvrirModifier(id: number): void {
    this.router.navigate(['admin/fonds-specifiques/modifier-fond-specifique/'+id]);
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin/fonds-specifiques/detail-fond-specifique/'+id]);
  }

  deleteFondSpecifique(fondspecifique: FondSpecifique): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression du fond spécifique Réf. <b>'+ fondspecifique.reference+'</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType    : 'danger',
      nzCancelText: 'Non',
      nzOnOk      : () => this.deleteOneRequete(fondspecifique),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneRequete(req: FondSpecifique): void {
    req.deleteBy = this.user.username;
    this.fondspecifiqueService.delete(req).subscribe(
      (data: FondSpecifique) => {
        //this.getList();
        this.fondspecifiqueList.splice(this.indexOfElement(data.id), 1);
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
    while (i < this.fondspecifiqueList.length && rep === false) {
      if (this.fondspecifiqueList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

}
