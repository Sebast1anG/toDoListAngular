import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../item';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  todoForm: FormGroup;
  @ViewChild('newItem') newItemInput: ElementRef;

  items: Item[] = [
    { description: 'Go shopping', done: true },
    { description: 'Play with dog', done: false },
    { description: 'Wash the dishes', done: false },
    { description: 'Refuel the car', done: false },
    { description: 'Hang the picture', done: false },
  ];
  done: Item[] = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });

    const initialDoneItems = this.items.filter((item) => item.done);
    this.done = this.done.concat(initialDoneItems);
    this.items = this.items.filter((item) => !item.done);
  }

  addItem(description: string) {
    this.items.unshift({
      description,
      done: false,
    });
    this.todoForm.get('item')?.setValue('');
  }

  deleteItem(item: number) {
    this.items.splice(item, 1);
  }

  deleteDoneItem(item: number) {
    this.done.splice(item, 1);
  }

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
