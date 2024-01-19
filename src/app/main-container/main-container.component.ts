import { Component } from '@angular/core';
import {TaskListComponent} from "../components/task-list/task-list.component";
import {NgIf} from "@angular/common";
import {TaskFormComponent} from "../components/task-form/task-form.component";

@Component({
  selector: 'app-main-container',
  standalone: true,
    imports: [
        TaskListComponent,
        NgIf,
        TaskFormComponent
    ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {

}
