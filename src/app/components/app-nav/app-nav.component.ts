import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['app-nav.component.scss'],
    template: `
        <div class="app-nav">
            <div class="warpper">
                <a routerLink="schedule" routerLinkActive="active">Schedule</a>
                <a routerLink="meals" routerLinkActive="active">Meals</a>
                <a routerLink="workouts" routerLinkActive="active">Workout</a>
            </div>
        </div>
    `
})
export class AppNavComponent {
    constructor() {}
}