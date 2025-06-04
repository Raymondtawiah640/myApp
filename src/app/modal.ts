import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
        <div *ngIf="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <p class="mb-4 font-medium">{{message}}</p>
            <div class="flex justify-around">
              <button (click)="confirm.emit()" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">{{confirmButtonText}}</button>
              <button (click)="cancel.emit()" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">{{closeButtonText}}</button>
            </div>
          </div>
        </div>
  `,
  styles: ``
})
export class Modal {
  @Input() showModal: boolean = false;
  @Input() title: string = ''; 
  @Input() message: string = '';
  @Input() confirmButtonText: string = '';
  @Input() closeButtonText: string = '';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>()
}
