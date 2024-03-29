import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('OtherPage <=> UsersPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        })
      ]),
      query(':enter', [
        style({ marginTop: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ marginTop: '100%' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ marginTop: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* <=> FilterPage', [
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
        style({ marginTop: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ marginTop: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ marginTop: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

  export const outAnimation =
  trigger('routeAnimations', [
    transition('OtherPage <=> UsersPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        })
      ]),
      query(':enter', [
        style({ marginBottom: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ marginBottom: '100%' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ marginBottom: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* <=> FilterPage', [
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
        style({ marginBottom: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ marginBottom: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ marginBottom: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);