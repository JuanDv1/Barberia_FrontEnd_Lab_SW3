import { Component } from '@angular/core';
import { EnConstruccionComponent } from '../../shared/en-construccion/en-construccion.component';

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [EnConstruccionComponent],
  template: `<app-en-construccion></app-en-construccion>`
})
export class AyudaComponent {
}
