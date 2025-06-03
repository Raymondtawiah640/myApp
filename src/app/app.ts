import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-blue-500 p-4 font-sans">
      <div class="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 text-center">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">To-Do App built by Raymond</h1>

        <div class="flex gap-3 mb-6">
          <input 
            [(ngModel)]="name"
            placeholder="Enter a task"
            class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            type="text"
          />
          <button 
            (click)="todoApp()" 
            [disabled]="!name.trim()" 
            class="px-3 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg disabled:opacity-50"
          >
            {{ editingIndex !== null ? 'Update' : 'Add' }}
          </button>

          <button *ngIf ="editingIndex !== null"
          (click)="cancelEdit()"
          class="px-3 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg"
          >
           Cancel 
          </button>
        </div>

        <ul class="space-y-3 text-left">
          <li *ngFor="let task of tasks; let i = index" class="flex justify-between items-start bg-gray-100 p-4 rounded-lg shadow-sm">
            <span [class.line-through]="task.done" class="flex-1 text-lg font-medium break-words" [class.text-gray-400]="task.done">{{ task.name }}</span>
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2 sm:mt-0">

              <button
                (click)="markTodo(i)"
                [disabled]="task.done"
                class="bg-yellow-400 text-black p-2 rounded-md font-semibold hover:bg-yellow-500 disabled:bg-gray-300 disabled:text-gray-600 flex items-center justify-center"
                title="Mark as Done"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>

              <button
              *ngIf="!task.done"
                (click)="editTodo(i)"
                class="bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600 flex items-center justify-center"
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z" />
                </svg>
              </button>

              <button
                (click)="deleteTodo(i)"
                class="bg-red-500 text-white p-2 rounded-md font-semibold hover:bg-red-600 flex items-center justify-center"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7L5 7M10 11v6M14 11v6M9 7V4h6v3" />
                </svg>
              </button>

            </div>
          </li>
        </ul>

        <!-- Modal -->
        <div *ngIf="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <p class="mb-4 font-medium">Are you sure you want to mark this task as done?</p>
            <div class="flex justify-around">
              <button (click)="confirmMarkTodo()" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Yes</button>
              <button (click)="closeModal()" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  name: string = '';
  tasks: { name: string; done: boolean }[] = [];
  editingIndex: number | null = null;

  showModal: boolean = false;
  modalTaskIndex: number | null = null;

  todoApp() {
    if (this.name.trim()) {
      if (this.editingIndex !== null) {
        this.tasks[this.editingIndex].name = this.name.trim();
        this.editingIndex = null;
      } else {
        this.tasks.push({ name: this.name.trim(), done: false });
      }
      this.name = '';
    }
  }

  cancelEdit(){
    this.editingIndex = null;
    this.name = '';
  }

  deleteTodo(index: number) {
    this.tasks.splice(index, 1);
  }

  editTodo(index: number) {
    this.name = this.tasks[index].name;
    this.editingIndex = index;
  }

  markTodo(index: number) {
    this.modalTaskIndex = index;
    this.showModal = true;
  }

  confirmMarkTodo() {
    if (this.modalTaskIndex !== null) {
      this.tasks[this.modalTaskIndex].done = true;
    }
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.modalTaskIndex = null;
  }
}
