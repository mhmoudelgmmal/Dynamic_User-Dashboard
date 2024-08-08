import { Component } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  link:string
  constructor(private router:Router){
    this.link = this.router.url
  }
}
