import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {

  constructor( private router: Router,) { }

  ngOnInit() {
  }

  
  navigateAdminUrl(): void {
    this.router.navigate(['admin']);
}

}
