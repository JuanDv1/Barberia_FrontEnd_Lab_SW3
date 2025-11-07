import { Component } from '@angular/core';
import { Producto } from '../modelos/producto';
import { ProductoService } from '../servicios/producto.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { Categoria } from '../../categorias/modelos/categoria';
import { categoriaService } from '../../categorias/servicios/categoria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, SweetAlert2Module, HttpClientModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  public producto: Producto = new Producto();
  public categorias: Categoria[] = [];
  public titulo: String = 'Crear servicio';
  public imagenPreview: string | ArrayBuffer | null = null;
  public selectedFile: File | null = null;

  constructor(
    private categoriaService: categoriaService,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.producto.objCategoria = null;
    this.categoriaService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));
  }

  public onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      reader.readAsDataURL(file);
      
      // Guardar el nombre del archivo o la ruta
      this.producto.imagen = file.name;
    }
  }

  public crearProducto() {
    console.log('Creando producto');
    console.log('Archivo seleccionado:', this.selectedFile);
    this.productoService.create(this.producto, this.selectedFile).subscribe({
      next: (response) => {
        console.log('Producto creado exitosamente');
        console.log(this.producto);
        Swal.fire(
          'Nuevo producto',
          `Producto ${response.nombre} creado con éxito!`,
          'success'
        ).then(() => {
          this.router.navigate(['/productos/admin']);
        });
      },
      error: (err) => {
        console.error('Error al crear producto:', err.message);
      },
    });
  }

  public cancelar(): void {
    this.router.navigate(['/productos/admin']);
  }
}
