import {TaskListComponent} from "./task-list.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TaskService} from "../../../services/task.service";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";


describe('Task List Componente', ()=>{
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule,
      ],
      providers: [
          TaskService
      ],
      schemas: [
          CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  })

  beforeEach(()=>{
    fixture = TestBed.createComponent(TaskListComponent);
    taskService = fixture.debugElement.injector.get(TaskService) ;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El componente deberia crearse',  ()=>{
    expect(component).toBeTruthy();
  })



  // toggleTaskState(id: string): void {
  //   this.taskService.toggleTaskStateById(id);
  // }

  it('El método toggleTaskState debe cambiar el estado de la tarea', ()=>{
    const id='';
    const lista = taskService.getTasks();
    console.log("=>(task-list.component.spec.ts:55) lista", lista);
    const spy1 = spyOn(taskService, 'toggleTaskStateById');
  })

  //
  // removeTask(id: string): void {
  //   this.taskService.removeTaskById(id)
  // }

})
































// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { TaskListComponent } from './task-list.component';
//
// describe('TaskListComponent', () => {
//   let component: TaskListComponent;
//   let fixture: ComponentFixture<TaskListComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [TaskListComponent]
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(TaskListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
