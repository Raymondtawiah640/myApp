import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from "./modal";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, Modal],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-blue-500 p-4 font-sans">
      <div class="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-8 text-center">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">To-Do App built by Raymond from space</h1>

        <div class="flex flex-col sm:flex-row gap-3 mb-6">
          <input 
            [(ngModel)]="name"
            placeholder="Enter a task"
            class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            type="text"
          />
          <div class="flex gap-2">
            <button 
              (click)="todoApp()" 
              [disabled]="!name.trim()" 
              class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg disabled:opacity-50"
            >
              {{ editingIndex !== null ? 'Update' : 'Add' }}
            </button>

            <button *ngIf="editingIndex !== null"
              (click)="cancelEdit()"
              class="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg"
            >
              Cancel 
            </button>
          </div>
        </div>

        <ul class="space-y-3">
          <li *ngFor="let task of tasks; let i = index" class="flex flex-col sm:flex-row sm:justify-between items-start bg-gray-100 p-4 rounded-lg shadow-sm gap-4">
            <span [class.line-through]="task.done" class="flex-1 text-lg font-medium break-words" [class.text-gray-400]="task.done">{{ task.name }}</span>
            <div class="flex flex-wrap gap-2">
              <button *ngIf="!task.done"
                (click)="handleConfirmAction('Are you sure you want to mark ' + task.name + ' as done?', 'Make As Done', 'No', 'Yes, mark as done', 'mark', i)"
                class="bg-yellow-400 text-black p-2 rounded-md font-semibold hover:bg-yellow-500 flex items-center justify-center"
                title="Mark as Done"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>

              <button *ngIf="task.done"
                (click)="handleConfirmAction('Are you sure you want to redo ' + task.name +  '?', 'Redo Task', 'No', 'Yes, redo', 'redo', i)"
                class="bg-purple-500 text-white p-2 rounded-md font-semibold hover:bg-purple-600 flex items-center justify-center"
                title="Redo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 14l-4-4m0 0l4-4m-4 4h16" />
                </svg>
              </button>

              <button *ngIf="!task.done"
                (click)="editTodo(i)"
                class="bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600 flex items-center justify-center"
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z" />
                </svg>
              </button>

              <button
                (click)="handleConfirmAction('Are you sure you want to delete this task: '+ task.name +'?', 'Confirm Delete', 'Cancel', 'Yes, delete', 'delete', i)"
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

        <app-modal 
          [message]="modalMessage"
          [title]="modalTitle"
          [showModal]="showModal"
          [confirmButtonText]="confirmButtonText"
          [closeButtonText]="closeButtonText"
          (confirm)="handleModalConfirm()"
          (cancel)="handleModalClose()"
        />
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

  deleteTaskIndex: number | null = null;
  redoTaskIndex: number | null = null;

  modalMessage: string = '';
  modalTitle: string = '';
  confirmButtonText: string = '';
  closeButtonText: string = '';
  visibleModal: string = '';

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

  cancelEdit() {
    this.editingIndex = null;
    this.name = '';
  }

  editTodo(index: number) {
    this.name = this.tasks[index].name;
    this.editingIndex = index;
  }

  confirmDeleteTodo() {
    if (this.deleteTaskIndex !== null) {
      this.tasks.splice(this.deleteTaskIndex, 1);
      this.handleModalClose();
    }
  }

  confirmMarkTodo() {
    if (this.modalTaskIndex !== null) {
      this.tasks[this.modalTaskIndex].done = true;
      this.handleModalClose();
    }
  }

  confirmRedoTodo() {
    if (this.redoTaskIndex !== null) {
      this.tasks[this.redoTaskIndex].done = false;
      this.handleModalClose();
    }
  }

  handleConfirmAction(message: string, title: string, closeText: string, confirmText: string, type: string, index: number) {
    this.modalMessage = message;
    this.modalTitle = title;
    this.closeButtonText = closeText;
    this.confirmButtonText = confirmText;
    this.visibleModal = type;
    this.showModal = true;

    if (type === 'delete') this.deleteTaskIndex = index;
    else if (type === 'mark') this.modalTaskIndex = index;
    else if (type === 'redo') this.redoTaskIndex = index;
  }

  handleModalConfirm() {
    if (this.visibleModal === 'delete') this.confirmDeleteTodo();
    else if (this.visibleModal === 'mark') this.confirmMarkTodo();
    else if (this.visibleModal === 'redo') this.confirmRedoTodo();
  }

  handleModalClose() {
    this.redoTaskIndex = null;
    this.deleteTaskIndex = null;
    this.modalTaskIndex = null;
    this.showModal = false;
  }
}
