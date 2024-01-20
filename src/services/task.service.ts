import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
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
  }

  setTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
    this.saveTasksToLocalStorage(tasks);
  }

  getCurrentTasks(): Task[] {
    return this.tasksSubject.value;
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$
  }

  addNewTask(newTask: Task): void {
    let currentTaskList: Task[] = this.getCurrentTasks();
    this.setTasks([...currentTaskList, newTask])
  }

  toggleTaskStateById(id: string){
    const currentTaskList: Task[] = this.getCurrentTasks();
    const taskToUpdate = currentTaskList.find(task => task.id === id);

      if (taskToUpdate) {
        taskToUpdate.isDone = !taskToUpdate.isDone;
        this.setTasks(currentTaskList)
      }
  }

  removeTaskById(id: string): void {
    const currentTaskList: Task[] = this.getCurrentTasks();
    const updatedTaskList: Task[] = currentTaskList.filter((task: Task) => task.id !== id);
    this.setTasks(updatedTaskList);
  }

  private saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
  private loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem(this.localStorageKey);
    let tasks: Task[];

    if (storedTasks) {
      tasks = storedTasks ? JSON.parse(storedTasks) : [];
    } else {
      tasks= [
        { id: UUID.UUID(), name: 'Pasear al perro', isDone: false },
        { id: UUID.UUID(), name: 'Comprar comida', isDone: false },
        { id: UUID.UUID(), name: 'Pagar el alquiler', isDone: false }
      ];
    }
    this.setTasks(tasks);
  }

}
