import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { AideAlimentaire } from '../../../../../models/AideAlimentaire';
import { User } from '../../../../../models/User';
import { AideAlimentaireService } from '../../../../../services/aideAlimentaire.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../../../utils/token.storage';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-aides-alimentaires',
  templateUrl: './list-aides-alimentaires.component.html',
  styleUrls: ['./list-aides-alimentaires.component.css']
})
export class ListAidesAlimentairesComponent implements OnInit {

  aideAlimentaireList: Array<AideAlimentaire> = [];

  filter: any;
  user: User = null;
  isChargment = false;

  constructor(
    private aideAlimentaireService: AideAlimentaireService,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService, ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getaideAlimentaireList();
  }

  getaideAlimentaireList(): void {
    this.isChargment = true;
    this.aideAlimentaireService.list().subscribe(
      (data: Array<AideAlimentaire>) => {
        this.aideAlimentaireList = data;
        this.isChargment = false;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.isChargment = false;
      });
  }

  ouvrirModifier(id: number): void {
    this.router.navigate(['admin/aides-secours/modifier-aides-alimentaire/'+id]);
  }

  ouvrirDetail(id: number): void {
    this.router.navigate(['admin/aides-secours/detail-aides-alimentaire/'+id]);
  }

  deleteAideAlimentaire(aideAlimentaire: AideAlimentaire): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression de l\'aideAlimentaire  N° <b>' + aideAlimentaire.id + '</b>' + '</b> année <b>' +
      aideAlimentaire.exercice.libelle + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneIde(aideAlimentaire),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneIde(aideAlimentaire: AideAlimentaire): void {
    aideAlimentaire.deleteBy = this.user.username;
    this.aideAlimentaireService.delete(aideAlimentaire).subscribe(
      (data: AideAlimentaire) => {
        //this.getList();
        this.aideAlimentaireList.splice(this.indexOfElement(data.id), 1);
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
    while (i < this.aideAlimentaireList.length && rep === false) {
      if (this.aideAlimentaireList[i].id === id) {
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
