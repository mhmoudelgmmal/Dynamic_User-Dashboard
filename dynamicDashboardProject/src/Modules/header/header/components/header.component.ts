import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import {FadeIn, slideInAnimation } from 'src/shared/animations/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations:[slideInAnimation,FadeIn(200,true)]
})
export class HeaderComponent implements OnInit,OnDestroy {
  LinkChanges:boolean = false
  destroy$ = new Subject()
  private subscription: Subscription = new Subscription();

  constructor(private activatedRoute:ActivatedRoute,private contexts: ChildrenOutletContexts,private store:Store){
    
  }
  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
    this.subscription.unsubscribe()
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {      
      let page = params['id'];
      page?this.LinkChanges = true:this.LinkChanges = false
  });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
