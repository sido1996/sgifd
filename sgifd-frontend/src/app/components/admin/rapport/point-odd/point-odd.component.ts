import { Component, OnInit } from '@angular/core';
import {Exercice} from "../../../../models/Exercice";
import {ExerciceService} from "../../../../services/exercice.service";

@Component({
  selector: 'app-point-odd',
  templateUrl: './point-odd.component.html',
  styleUrls: ['./point-odd.component.css']
})
export class PointOddComponent implements OnInit {

  exerciceList: Exercice[] = [];

  anneeDebut: Exercice = null;
  anneeFin: Exercice = null;

  constructor(
    private exerciceService: ExerciceService,
  ) { }

  ngOnInit() {
    this.exerciceService.list().subscribe(
      (data: Array<Exercice>) => {
        this.exerciceList = data;
      });
  }

  editerRapport(): void {

  }

}
