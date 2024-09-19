import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/AppState';
import { ActivatedRoute } from '@angular/router';
import { selectColumns } from '../../state/board/board.selector';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-task-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-modal.component.html',
  styleUrl: './task-form-modal.component.scss'
})
export class TaskFormModalComponent implements OnInit, OnDestroy {

  taskForm!: FormGroup;
  boardIsActive:boolean = false;

  constructor (
    private fb: FormBuilder,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
  ) {};

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      subtask: this.fb.array([]),
      status: this.fb.array([]),
    });

    // getting the columns from the board
    this.activatedRoute.params.subscribe(
      params => {
        const id = params['id'];
        console.log('logging id on init of form: ', id);
        this.store.select(selectColumns(id)).pipe(
          tap(data => console.log(data)),
          // map(data => {

          // })
        ).subscribe()
      }
    )

  }

  ngOnDestroy(): void {
    
  }

  get subTaskArray () {
    return this.taskForm.get('subtask') as  FormArray;
  }

  get statusArray () {
    return this.taskForm.get('status') as FormArray;
  }

  addSubTask (): void {
    const element = this.fb.group({
      title: ['', Validators.required],
      isCompleted: [false],
    })
    this.subTaskArray.push(element)
  }

  selectStatus ():void {
    const element = this.fb.group({
      status: [''],
    });
    this.statusArray.push(element)
  }

  clear ():void {
    this.taskForm.reset();
  }

  removeSubTask (index:number) {
    this.subTaskArray.removeAt(index)
  }

  createTask () {
    const form = this.taskForm;
    if (form.invalid) {
      console.log('invalid form')
      return;
    };

    const {status, ...data} = form.value;
    console.log(data, status);
    // dispatch action and payload
    // this.store.dispatch(createTask())


  }


}
