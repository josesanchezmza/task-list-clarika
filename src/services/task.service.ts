import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UUID} from "angular2-uuid";
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
  private localStorageKey = 'tasks';
  tasks$ = this.tasksSubject.asObservable();
  constructor() {
    this.loadTasksFromLocalStorage();
    // this.setTasks([
    //   { id: UUID.UUID(), name: 'Pasear al perro', isDone: false },
    //   { id: UUID.UUID(), name: 'Comprar Comida', isDone: false },
    //   { id: UUID.UUID(), name: 'Pagar el alquiler', isDone: false }
    // ]);
  }

  setTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
    this.saveTasksToLocalStorage(tasks);
  }

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }

  addNewTask(newTask: Task): void {
    const currentTaskList: Task[] = this.getTasks();
    this.setTasks([...currentTaskList, newTask])
  }

  toggleTaskStateById(id: string){
    const currentTaskList: Task[] = this.getTasks();
    const taskToUpdate = currentTaskList.find(task => task.id === id);

      if (taskToUpdate) {
        taskToUpdate.isDone = !taskToUpdate.isDone;
      }

      this.setTasks(currentTaskList)
  }

  removeTaskById(id: string): void {
    const currentTaskList: Task[] = this.getTasks();
    const updatedTaskList: Task[] = currentTaskList.filter((task: Task) => task.id !== id);
    this.setTasks(updatedTaskList);
  }

  private saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
  private loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem(this.localStorageKey);
    const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
    this.setTasks(tasks);
  }

}
