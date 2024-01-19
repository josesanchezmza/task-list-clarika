import {TaskListComponent} from "./task-list.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Task, TaskService} from "../../../services/task.service";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {of} from "rxjs";

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

  it('El componente debería crearse',  ()=>{
    expect(component).toBeTruthy();
  })

  it('En ngOnInit debería realizarse la subscripción al obs de task y obtener un array de tipo Task[]', ()=>{
    const taskList: Task[] = [];
    const spy1 = spyOn(taskService, 'getTasks').and.returnValue(of(taskList));
    component.ngOnInit();
    expect(spy1).toHaveBeenCalled();
  })

  it('En ngOnDestroy debería desubscripción al obs de task', () => {
    spyOn(component.subscriptions[0], 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscriptions[0].unsubscribe).toHaveBeenCalled();
  });

})
