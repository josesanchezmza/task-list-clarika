import {Component, OnDestroy, OnInit} from '@angular/core';
import {JsonPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {TaskFormComponent} from "../task-form/task-form.component";
import {TaskService} from "../../../services/task.service";
import {Subscription} from "rxjs";
import {TaskItemComponent} from "../task-item/task-item.component";
interface Task {
  id: string
  name: string
  isDone: boolean
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    NgStyle,
    TaskFormComponent,
    NgIf,
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

  ngOnInit(){
    const taskSubscription=  this.taskService.tasks$.subscribe((tasks)=>{
      this.taskList=[...tasks];
      console.log("=>(task-list.component.ts:38) tasks", tasks);
    });


    this.subscriptions = [...this.subscriptions, taskSubscription]
  }

  ngOnDestroy(){
    this.subscriptions.forEach((sub)=>sub.unsubscribe());
  }


  toggleTaskFormVisibility() {
    this.isTaskFormVisible=!this.isTaskFormVisible;
  }
}
