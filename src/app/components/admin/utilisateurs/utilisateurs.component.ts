import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";




@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
 
  constructor(  private router: Router, ) { }

  ngOnInit() {
  }

  navigateAdminUrl(): void {
      this.router.navigate(['admin']);
  }

}
