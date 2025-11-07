import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public esAdministrador: boolean = false;

  constructor(private router: Router) {}

  toggleRol() {
    this.esAdministrador = !this.esAdministrador;
    console.log('Rol cambiado a:', this.getRolActual());
    console.log('esAdministrador:', this.esAdministrador);
    
    // Navegar automáticamente a la vista correcta
    if (this.esAdministrador) {
      this.router.navigate(['/productos/admin']);
    } else {
      this.router.navigate(['/productos/listar']);
    }
  }

  getRolActual(): string {
    return this.esAdministrador ? 'Administrador' : 'Cliente';
  }

  getIconoRol(): string {
    return this.esAdministrador ? 'fas fa-user-shield' : 'fas fa-user';
  }
}
