import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  barberiaNombre: String ="Barberia Los Compas";
  descripcion:String="Servicio de barberia para tener un look fresco y moderno.";
  direccion:String="Calle 123 #45-67, Popayan, Colombia";
  logoUrl:String="assets/images/logo.png";
}


