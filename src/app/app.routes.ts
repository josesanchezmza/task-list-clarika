import { Routes } from '@angular/router';
import {MainContainerComponent} from "./main-container/main-container.component";

export const routes: Routes = [
    { path: 'main-container-component', title: 'Task List Clarika', component: MainContainerComponent },
    { path: '',   redirectTo: '/main-container-component', pathMatch: 'full' }, // redirect to `first-component`
    { path: '**', component: MainContainerComponent },  // Wildcard route for a 404 page
];
