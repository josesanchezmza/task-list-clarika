import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
export interface Task {
  id: string;
  name: string;
  isDone: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  constructor() {
    this.setTasks([
      { id: '1', name: 'Task 1', isDone: false },
      { id: '2', name: 'Task 2', isDone: true },
      { id: '3', name: 'Task 3', isDone: false }
    ]);
  }


  setTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
  }

  addNewTask(newTask: Task): void {
    const currentTaskList = this.getTasks();
    console.log("=>(task.service.ts:29) currentTaskList", currentTaskList);
    this.setTasks([...currentTaskList, newTask])
  }

  // removeTaskById(id: String): void {
  //   this.tasksSubject.next([...tasks, newTask]);
  // }

  getTasks(): Task[] {
    console.log("=>(task.service.ts:37) this.tasksSubject.value", this.tasksSubject.value);
    return this.tasksSubject.value;
  }







  //
  //
  // toggleTaskState(id: string, list: Task[]): void {
  //
  //   const foundTask = list.find(task => task.id === id);
  //
  //   if (foundTask) {
  //     foundTask.isDone = !foundTask.isDone;
  //   }
  //
  //   this.setTasks([...list])
  // }
  //
  // removeTask(taskId: string, list: Task[]): void {
  //   const indexToRemove = list.findIndex(task => task.id === taskId);
  //
  //   if (indexToRemove !== -1) {
  //     list.splice(indexToRemove, 1);
  //   }
  //
  //   this.setTasks([...list])
  // }
}
