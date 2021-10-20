import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../../utils/token.storage";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ProjetProgrammeService} from "../../../../services/projet-programme.service";
import {ProjetProgramme} from "../../../../models/ProjetProgramme";
import {Exercice} from "../../../../models/Exercice";
import {HttpErrorResponse} from "@angular/common/http";
import {ExerciceService} from "../../../../services/exercice.service";
import {User} from "../../../../models/User";
import {ProjetProgrammeFinalise} from "../../../../models/ProjetProgrammeFinalise";

@Component({
  selector: 'app-list-projet-cloturer',
  templateUrl: './list-projet-cloturer.component.html',
  styleUrls: ['./list-projet-cloturer.component.css']
})
export class ListProjetCloturerComponent implements OnInit {

  exercice: Exercice = null;

  exerciceList: Array<Exercice> = [];
  projetcloturerList : Array<ProjetProgrammeFinalise> = [];

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
              private message: NzMessageService,) {
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
      this.filter = null;
      this.projetcloturerList = [];
      this.projetProgrammeService.listCloturer(this.exercice.id).subscribe(
        (data: Array<ProjetProgrammeFinalise>) => {
          this.projetcloturerList = data;
          this.isChargment = false;
        },
        (error: HttpErrorResponse) => {
          console.log('Echec !');
        });
    }
  }

  ouvrirDetailInformation(id: number): void {
    this.router.navigate(['admin/projet/detail-projet-suivi/'+id]);
  }

  relanceConfirmation(p: ProjetProgramme): void {
    this.modalService.confirm({
      nzTitle: 'Information',
      nzContent: '<p> Confirmez - vous la relance du projet <br>N°Enreg. : <b>' + p.id + '</b> <br>Intitulé : <b>' +
        p.libelle + '</b> ?</p>',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzCancelText: 'Non',
      nzOnOk: () => this.relanceProjet(p),
      nzOnCancel: () => console.log('cancel')
    });
  }

  relanceProjet(p: ProjetProgramme): void {

    this.projetProgrammeService.relancer(p.id).subscribe(
      (data: ProjetProgramme) => {
        //this.getList();
        this.modalService.info({
          nzTitle: 'Confirmation',
          nzContent: '<p> Le projet a été relancé avec succès !</p>',
          nzOkText: 'Oui',
          nzOkType: 'primary',
          nzCancelText: null,
          nzOnOk: () => this.gotoListProjet(),
          nzOnCancel: () => console.log('cancel')
        });
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

   /* Debut méthode format monnetaire */
  formatNumber(num: number) : string{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
   /* Fin méthode format monnetaire */

  gotoListProjet() {
    this.router.navigate(['admin/projet/list-projet-en-cours']);
  }

  ouvrirGererFinancement(id: number): void {
    this.router.navigate(['admin/projet/suivi-financier/'+id]);
  }

  filtreGlobalList(): void {
    if(this.filter != null && this.filter != '') {
      this.projetcloturerList = [];
      this.exercice = null;
      this.isSearching = true;
      let resultSplit = (this.filter.trim()).replace(/[&\/\\#\-\_,+()$~%.":*?<>{}]/g, ' ');
      console.log(resultSplit);
      let resultSplitBefore = resultSplit.split(' ');
      let resultSpliteAfter = "";
      if(resultSplitBefore.length > 0) {
        resultSplitBefore.forEach((r, index) => {
          if(r != '') {
            //if(index != (resultSplitBefore.length - 1)) {
            resultSpliteAfter += "AND libelle LIKE '%"+  r.replace("'", "''") + "%' ";
            // }
          }
        });
      }
      this.projetProgrammeService.verifierDoublonByLibelle(resultSpliteAfter)
        .subscribe((data: ProjetProgrammeFinalise[]) => {
          console.log(data);
          if(data != null && data.length > 0) {
            this.projetcloturerList = data;
            this.projetcloturerList = [...this.projetcloturerList];
          }
          this.isSearching = false;
        }, err => {
          console.log(err);
          this.isSearching = false;
          this.projetcloturerList = [...this.projetcloturerList];
        });
    }
  }

}
