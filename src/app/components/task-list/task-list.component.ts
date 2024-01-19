import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";
import {TaskFormComponent} from "../task-form/task-form.component";
import {Task, TaskService} from "../../../services/task.service";
import {Subscription} from "rxjs";
import {TaskItemComponent} from "../task-item/task-item.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    TaskFormComponent,
    TaskItemComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  taskList: Task[] = [];

  isTaskFormVisible=false;
  subscriptions: Subscription[]=[];

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    const taskSubscription = this.taskService.getTasks().subscribe((tasks) => {
      this.taskList = [...tasks];
    });

    this.subscriptions = [taskSubscription]
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
