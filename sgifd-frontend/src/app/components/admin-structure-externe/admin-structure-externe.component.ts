import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-admin-structure-externe',
  templateUrl: './admin-structure-externe.component.html',
  styleUrls: ['./admin-structure-externe.component.css']
})
export class AdminStructureExterneComponent implements OnInit {

  constructor( private router: Router, ) { }

  ngOnInit() {
  }

  navigateAdminUrl(): void {
    this.router.navigate(['admin']);
}

}
