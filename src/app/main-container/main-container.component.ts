import { Component } from '@angular/core';
import {TaskListComponent} from "../components/task-list/task-list.component";

@Component({
  selector: 'app-main-container',
  standalone: true,
    imports: [
        TaskListComponent
    ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {

}
