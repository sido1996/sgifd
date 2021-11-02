import { Component, OnInit } from "@angular/core";
import { RequetePtf } from "../../../models/adminPtf/RequetePtf";
import { User } from "../../../models/User";
import { RequetePtfService } from "../../../services/requete-ptf.service";
import { Router } from "@angular/router";
import { TokenStorage } from "../../../utils/token.storage";
import { NzModalService } from "ng-zorro-antd";
import { HttpErrorResponse } from "@angular/common/http";
import { Exercice } from "../../../models/Exercice";
import { ExerciceService } from "../../../services/exercice.service";
import { ProjetFinance } from "../../../models/adminPtf/ProjetFinance";
import { FinanceAnnuelProjet } from "../../../models/adminPtf/FinanceAnnuelProjet";

@Component({
  selector: "app-finance-annuel-projet",
  templateUrl: "./finance-annuel-projet.component.html",
  styleUrls: ["./finance-annuel-projet.component.css"],
})
export class FinanceAnnuelProjetComponent implements OnInit {
  exercice: Exercice = null;

  exerciceList: Array<Exercice> = [];

  requeteList: Array<FinanceAnnuelProjet> = [];
  //requeteList[]
  reqList;

  filter: any;
  user: User = null;

  isChargment: boolean = false;

  constructor(
    private requetePtfService: RequetePtfService,
    private router: Router,
    private exerciceService: ExerciceService,
    private tokenStorage: TokenStorage,
    private modalService: NzModalService
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getListExercice();
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    //this.getList();
  }

  getListExercice(): void {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceList = data;
      },
      (error: HttpErrorResponse) => {
        console.log("Echec !");
      }
    );
  }
  //this.user.ptf.id
  makeListeProjet(): void {
    this.isChargment = true;
    console.log(this.exercice.id);
    this.requetePtfService.financementAnnuelProjet(this.exercice.id).subscribe(
      (data) => {
        this.reqList = data;

        this.requeteList = [];

        let i = 0;
        let r: FinanceAnnuelProjet = null;
        while (i < this.reqList.length) {
          r = new FinanceAnnuelProjet();
          r.montantRessourceDecaisser = this.reqList[i][1];
          r.montantRessourceProgrammer = this.reqList[i][0];
          r.deviseMonnaie = this.reqList[i][2];
          r.natureFinancement = this.reqList[i][3];
          r.id = this.reqList[i][6];
          r.reference = this.reqList[i][4];
          r.libelle = this.reqList[i][5];
          console.log(r);
          this.requeteList.unshift(r);

          i++;
        }
        this.isChargment = false;
        console.log(this.requeteList);
      },
      (error: HttpErrorResponse) => {
        console.log("Echec !");
        this.isChargment = false;
      }
    );
  }

  ouvrirDetail(id: number): void {
    console.log(id);
    this.router.navigate(["admin-ptf/detail-projets-finances/" + id]);
  }

  /* Debut méthode format monnetaire */
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  }
  /* Fin méthode format monnetaire */
}
