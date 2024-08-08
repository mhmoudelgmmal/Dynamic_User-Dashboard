import { trigger, transition, style, query, animateChild, group, animate, AnimationTriggerMetadata } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Dashboard <=> UserData', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
      ]),
    ]),
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
        query('@*', animateChild(), { optional: true })
      ]),
    ])
  ]);
  export function FadeIn(timingIn: number, height: boolean = false): AnimationTriggerMetadata  {
    return trigger('fadeIn', [
      transition(':enter', [
        style(height ? { opacity: 0 , height: 0, } : { opacity: 0, }),
        animate(timingIn, style(height ? { opacity: 1, height: 'fit-content' } : { opacity: 1, })),
      ]),
    ]);
  }