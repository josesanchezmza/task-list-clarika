import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {Task, TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    NgStyle,
    NgForOf,
    NgClass
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  constructor( private taskService: TaskService) {}

  @Input() task: Task = {
    id: '',
    name: '',
    isDone: false
  };


  toggleTaskState(id: string): void {
    this.taskService.toggleTaskStateById(id);
  }

  removeTask(id: string): void {
    this.taskService.removeTaskById(id)
  }

}
