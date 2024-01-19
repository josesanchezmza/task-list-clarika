import {Component, OnDestroy, OnInit} from '@angular/core';
import {JsonPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {TaskFormComponent} from "../task-form/task-form.component";
import {TaskService} from "../../../services/task.service";
import {Subscription} from "rxjs";
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
    NgIf
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

  toggleTaskState(id: string): void {
    const foundTask = this.taskList.find(task => task.id === id);

    if (foundTask) {
      foundTask.isDone = !foundTask.isDone;
    }
    this.taskService.setTasks([...this.taskList])
  }

  removeTask(taskId: string): void {
    const indexToRemove = this.taskList.findIndex(task => task.id === taskId);

    if (indexToRemove !== -1) {
      this.taskList.splice(indexToRemove, 1);
    }
    this.taskService.setTasks([...this.taskList])
  }

  toogleTaskFormVisibility() {
    console.log("=>(task-list.component.ts:59) ");
    this.isTaskFormVisible=!this.isTaskFormVisible;
  }
}
