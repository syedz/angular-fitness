import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from "@angular/router";

// third-party modules
import { AngularFireModule, FirebaseAppConfig, FirebaseApp } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// shared modules
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
    {
        path: 'auth',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', loadChildren: './login/login.module#LoginModule' },
            { path: 'register', loadChildren: './register/register.module#RegisterModule' }
        ],
    }
];

export const firebaseConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyBzl4PHMSJn_GfzU-AbENhKP1y2T_XyB9E",
    authDomain: "fitness-app-54c2e.firebaseapp.com",
    databaseURL: "https://fitness-app-54c2e.firebaseio.com",
    projectId: "fitness-app-54c2e",
    storageBucket: "fitness-app-54c2e.appspot.com",
    messagingSenderId: "180176854908",
    appId: "1:180176854908:web:dd6de98dd19a09a56e0ef9"
  }

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoot(), // Need to call forRoot() to avoid duplicate instance of AuthService
    ],
})
export class AuthModule {}