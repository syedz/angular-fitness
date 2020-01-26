import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Store } from 'store';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Meal {
    name: string,
    ingredients: string[],
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class MealsService {
    meals$ = this.db.list(`meals/${this.uid}`)
        .snapshotChanges().pipe(
            tap((next) => {
                console.log(next);
                return this.store.set('meals', next)
            })

            // map(actions => {
            //     return actions.map(a => {
            //         console.log(a.payload.val())
            //         this.store.set('meals', a.payload.val());
            //         console.log(this.store.value);
            //     });
            // })
        );

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) {}
    
    get uid() {
        return this.authService.user.uid;
    }

    addMeal(meal: Meal) {
        return this.db.list(`meals/${this.uid}`).push(meal);
    }

    removeMeal(key: string) {
        return this.db.list(`meals/${this.uid}`).remove(key);
    }
}