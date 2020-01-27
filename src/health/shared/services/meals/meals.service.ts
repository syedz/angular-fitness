import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Store } from 'store';

import { Observable, of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

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
    meals$: Observable<Meal[]> = this.db.list<Meal>(`meals/${this.uid}`)
        .snapshotChanges().pipe(
            map(meals => 
                meals.map(meal => ({ $key: meal.key, ...meal.payload.val() }))
            ),
            tap((next) => this.store.set('meals', next))
        );

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) {}
    
    get uid() {
        return this.authService.user.uid;
    }

    getMeal(key: string) {
        if (!key) return of({});

        return this.store.select<Meal[]>('meals')
            .pipe(
                filter((meal) => !!meal),
                map(meals => meals.find((meal: Meal) => meal.$key === key))
            );
    }

    addMeal(meal: Meal) {
        return this.db.list(`meals/${this.uid}`).push(meal);
    }

    updateMeal(key: string, meal: Meal) {
        return this.db.object(`meals/${this.uid}/${key}`).update(meal);
    }

    removeMeal(key: string) {
        return this.db.list(`meals/${this.uid}`).remove(key);
    }
}