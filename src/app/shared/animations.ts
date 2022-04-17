// import { trigger, transition, style, animate, query } from "@angular/animations";

import { trigger, transition, style, animate, state } from "@angular/animations";

export const fadeInOutAnimation = trigger(
  'fadeInOutAnimation',
  [
    transition(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('.3s ease-out',
          style({ opacity: 1 }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ opacity: 1 }),
        animate('.3s ease-in',
          style({ opacity: 0 }))
      ]
    )
  ]
)

export const fadeInAnimation = trigger(
  'fadeInAnimation',
  [
    transition(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('.3s ease-out',
          style({ opacity: 1 }))
      ]
    )
  ]
)

export const detailExpand = trigger('detailExpand', [
  state('collapsed', style({ height: '0px', minHeight: '0' })),
  state('expanded', style({ height: '*' })),
  transition(
    'expanded <=> collapsed',
    animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
  ),
])
