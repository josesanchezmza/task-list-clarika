import { Routes } from '@angular/router';
import {MainContainerComponent} from "./main-container/main-container.component";

export const routes: Routes = [
    { path: 'task-list', title: 'Task List Clarika', component: MainContainerComponent },
    { path: '',   redirectTo: '/task-list', pathMatch: 'full' },
    { path: '**',   redirectTo: '/task-list', pathMatch: 'full' },
];
