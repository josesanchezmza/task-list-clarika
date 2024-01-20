import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UUID} from "angular2-uuid";
import {TaskService} from "../../../services/task.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-task-form',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgClass
    ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private taskService: TaskService) {
    this.taskForm = this.fb.group({
      id: [UUID.UUID(), Validators.required],
      name: ['', [Validators.required, Validators.minLength(1)]],
      isDone: [false]
    });
  }

  onSubmit(): void {
    this.taskService.addNewTask(this.taskForm.value);

    this.taskForm.reset({
      id: UUID.UUID(),
      name: '',
      isDone: false
    });
  }
}
