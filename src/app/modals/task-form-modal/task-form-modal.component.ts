import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-modal.component.html',
  styleUrl: './task-form-modal.component.scss'
})
export class TaskFormModalComponent implements OnInit, OnDestroy {

  taskForm!: FormGroup;

  constructor (
    private fb: FormBuilder,
  ) {};

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      subtask: this.fb.array([]),
      status: this.fb.array([]),
    })
  }

  ngOnDestroy(): void {
    
  }

}
