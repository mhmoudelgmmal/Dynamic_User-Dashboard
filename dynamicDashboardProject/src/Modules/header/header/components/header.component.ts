import { Component } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import {FadeIn, slideInAnimation } from 'src/shared/animations/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations:[slideInAnimation,FadeIn(200,true)]
})
export class HeaderComponent {
  link:string

  constructor(private router:Router,private contexts: ChildrenOutletContexts){
    this.link = this.router.url
  }
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
