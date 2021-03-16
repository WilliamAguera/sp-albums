import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    animations: [
        trigger('fade', [
            transition('* => *', [
                query(':enter', [
                        style({ opacity: 0 }),
                        stagger(50, [animate('0.2s', style({ opacity: 1 }))])
                    ], { optional: true }
                )
            ])
        ])
    ]
})
export class AuthComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    getRouterOutletState(outlet: RouterOutlet) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
