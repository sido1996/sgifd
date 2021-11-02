import { Component, OnInit } from '@angular/core';
import { PPP } from '../../../../models/PPP';
import { User } from '../../../../models/User';
import { PPPService } from '../../../../services/ppp.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzModalService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';
import { CommissionMixteDspService } from '../../../../services/commission-mixte-dsp.service';
import {CommissionMixteDsp} from "../../../../models/CommissionMixteDsp";

@Component({
  selector: 'app-list-commission-mixte-dsp',
  templateUrl: './list-commission-mixte-dsp.component.html',
  styleUrls: ['./list-commission-mixte-dsp.component.css']
})
export class ListCommissionMixteDspComponent implements OnInit {

  commissionMixteDspList: Array<CommissionMixteDsp> = [];

  filter: any;
  user: User = null;

  constructor(
    private commissionMixteDspService: CommissionMixteDspService,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.commissionMixteDspService.list().subscribe(
      (data: Array<CommissionMixteDsp>) => {
        this.commissionMixteDspList = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  ouvrirModifier(id: number): void {
    this.router.navigate(['admin/commision-dsp/modifier-commission-mixte-dsp/'+id]);
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin/commision-dsp/detail-commission-mixte-dsp/'+id]);
  }

  deleteCommissionMixteDsp(commissionMixteDsp: CommissionMixteDsp): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de la commission Mixte Dsp nommée <b>'+ commissionMixteDsp.libelle+'</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType    : 'danger',
      nzCancelText: 'Non',
      nzOnOk      : () => this.deleteOneRequete(commissionMixteDsp),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneRequete(req: CommissionMixteDsp): void {
    req.deleteBy = this.user.username;
    this.commissionMixteDspService.delete(req).subscribe(
      (data: CommissionMixteDsp) => {
        //this.getList();
        this.commissionMixteDspList.splice(this.indexOfElement(data.id), 1);
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
    while (i < this.commissionMixteDspList.length && rep === false) {
      if (this.commissionMixteDspList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }

}
