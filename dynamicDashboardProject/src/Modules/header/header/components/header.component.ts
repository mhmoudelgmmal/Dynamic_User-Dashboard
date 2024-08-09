import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {FadeIn, slideInAnimation } from 'src/shared/animations/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations:[slideInAnimation,FadeIn(200,true)]
})
export class HeaderComponent implements OnInit {
  LinkChanges:boolean = false

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private contexts: ChildrenOutletContexts){
    
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      
      let page = params['id'];
      page?this.LinkChanges = true:this.LinkChanges = false
  });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
