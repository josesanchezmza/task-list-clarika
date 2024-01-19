import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UUID} from "angular2-uuid";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  @Output() onClose = new EventEmitter();

  taskForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private taskService: TaskService) {
    this.taskForm = this.fb.group({
      id: [UUID.UUID(), Validators.required],
      name: ['', Validators.required],
      isDone: [false]
    });
  }

  ngOnInit(){

  }

  onSubmit(): void {
    this.taskService.addNewTask(this.taskForm.value);

    // this.taskForm.reset({
    //   id: UUID.UUID(),
    //   name: '',
    //   isDone: false
    // });
    this.onClose.emit();
  }



  close(): void {
    this.onClose.emit();
  }
}
