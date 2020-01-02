import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { RegisterComponent } from './containers/register/register.component';

export const ROUTES: Routes = [
    { path: '', component: RegisterComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        RegisterModule
    ]
})
export class RegisterModule {}