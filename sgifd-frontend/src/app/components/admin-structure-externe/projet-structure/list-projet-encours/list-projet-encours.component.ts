import { Component, OnInit } from '@angular/core';
import { Exercice } from '../../../../models/Exercice';
import { ProjetProgramme } from '../../../../models/ProjetProgramme';
import { User } from '../../../../models/User';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../../utils/token.storage';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ExerciceService } from '../../../../services/exercice.service';
import { ProjetProgrammeService } from '../../../../services/services-structure-externe/projet-programme.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Accord } from '../../../../models/Accord';
import {ProjetProgrammeFinalise} from "../../../../models/ProjetProgrammeFinalise";

@Component({
  selector: 'app-list-projet-encours',
  templateUrl: './list-projet-encours.component.html',
  styleUrls: ['./list-projet-encours.component.css']
})
export class ListProjetEncoursComponent implements OnInit {

  exercice: Exercice = null;

  exerciceList: Array<Exercice> = [];
  projetencoursList: Array<ProjetProgrammeFinalise> = [];

  user: User = null;
  filter: any;

  isChargment: boolean = false;
  isSearching: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService,
    private exerciceService: ExerciceService,
    private projetProgrammeService: ProjetProgrammeService,
    private message: NzMessageService, ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getListExercice();
  }

  getListExercice(): void {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  makeListeProjet(): void {
    if(this.exercice != null) {
      this.isChargment = true;
      this.projetencoursList = [];
      this.projetProgrammeService.listEnCoursByAnneeByStructure(this.exercice.id).subscribe(
        (data: Array<ProjetProgrammeFinalise>) => {
          this.projetencoursList = data;
          console.log(this.projetencoursList);
          this.isChargment = false;
        },
        (error: HttpErrorResponse) => {
          console.log('Echec !');
        });
    }
  }

  deleteProjet(projet: ProjetProgramme): void {
    this.modalService.error({
      nzTitle: 'Confirmation',
      nzContent: '<p> Confirmez - vous la suppression du projet N°Enreg. : <b>' + projet.id + '</b>' +
        ' portant la référence : <b>' + projet.reference + '</b> de l\'année de collecte : <b>' + projet.annee.libelle + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzCancelText: 'Non',
      nzOnOk: () => this.deleteOneProjet(projet),
      nzOnCancel: () => console.log('cancel')
    });
  }

  deleteOneProjet(projet: ProjetProgramme): void {
    projet.deleteBy = this.user.username;
    this.projetProgrammeService.delete(projet).subscribe(
      (data: ProjetProgramme) => {
        //this.getList();
        this.projetencoursList.splice(this.indexOfElement(data.id), 1);
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
    while (i < this.projetencoursList.length && rep === false) {
      if (this.projetencoursList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    return index;
  }


  ouvrirModifier(id: number): void {
    this.projetProgrammeService.getById(id).subscribe(
      (data: any) => {
        //this.getList();
        this.tokenStorage.saveCurrentProjet(data);
        this.router.navigate(['admin-structure-externe/projet-structure/enregistrer-projet']);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        //this.notificationTable('danger', 'Echec de la suppression !');
      });
  }

  ouvrirDetailSuivi(id: number): void {
    this.router.navigate(['admin-structure-externe/projet-structure/detail-projet-suivi/' + id]);
  }


  ouvrirGererFinancement(id: number): void {
    this.router.navigate(['admin-structure-externe/projet-structure/suivi-financier/'+id]);
  }

  /* Debut méthode format monnetaire */
  formatNumber(num: number): string {
    return num != null && num != undefined ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') : '0';
  }
  /* Fin méthode format monnetaire */

  filtreGlobalList(): void {
    if(this.filter != null && this.filter != '') {
      this.projetencoursList = [];
      this.exercice = null;
      this.isChargment = true;
      let resultSplit = (this.filter.trim()).replace(/[&\/\\#\-\_,+()$~%.":*?<>{}]/g, ' ');
      console.log(resultSplit);
      let resultSplitBefore = resultSplit.split(' ');
      let resultSpliteAfter = "";
      if(resultSplitBefore.length > 0) {
        resultSplitBefore.forEach((r, index) => {
          if(r != '') {
            //if(index != (resultSplitBefore.length - 1)) {
            resultSpliteAfter += "AND libelle LIKE '%"+ r.replace("'", "''") + "%' ";
            // }
          }
        });
      }
      this.projetProgrammeService.verifierDoublonByLibelle(resultSpliteAfter)
        .subscribe((data: ProjetProgrammeFinalise[]) => {
          console.log(data);
          if(data != null && data.length > 0) {
            this.projetencoursList = data;
            this.projetencoursList = [...this.projetencoursList];
          }
          this.isChargment = false;
        }, err => {
          console.log(err);
          this.isChargment = false;
          this.projetencoursList = [...this.projetencoursList];
        });
    }
  }


}
