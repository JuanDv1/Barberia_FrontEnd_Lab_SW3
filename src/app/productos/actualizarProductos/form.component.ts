import { Component } from '@angular/core';
import { Producto } from '../modelos/producto';
import { ProductoService } from '../servicios/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Categoria } from '../../categorias/modelos/categoria';
import { CommonModule } from '@angular/common';
import { categoriaService } from '../../categorias/servicios/categoria.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,CommonModule, SweetAlert2Module, HttpClientModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  public producto: Producto = new Producto();
  public categorias: Categoria[] = [];
  public titulo: String = 'Actualizar producto';
  public imagenPreview: string | ArrayBuffer | null = null;
  public selectedFile: File | null = null;

  constructor(
    private categoriaService: categoriaService, 
    private productoService: ProductoService, 
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const productoId = this.route.snapshot.paramMap.get('id');

    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;

      if (productoId) {
        this.productoService.getProductoById(+productoId).subscribe(producto => {
          // Reasignar la categoría del producto con la misma instancia del arreglo
          this.producto = producto;
          if (producto.objCategoria !== null && producto.objCategoria !== undefined) {
            this.producto.objCategoria = this.categorias.find(cat => cat.id === producto.objCategoria?.id) || null;
          }
          
          // Cargar preview de la imagen existente
          if (producto.imagen) {
            console.log('Ruta de imagen:', producto.imagen);
            this.imagenPreview = producto.imagen;
            console.log('Preview URL:', this.imagenPreview);
          } else {
            console.log('No hay imagen para este producto');
          }
        });
      }
    });
  }

  public actualizarProducto(): void {
    console.log("Actualizando producto", this.producto);
    console.log('Archivo seleccionado:', this.selectedFile);
    this.productoService.update(this.producto, this.selectedFile).subscribe(
      response => {
        console.log("Producto actualizado exitosamente");
        Swal.fire('Producto actualizado', `Producto ${response.nombre} actualizado con éxito!`, 'success')
        .then(() => {
          this.router.navigate(['/productos/admin']);
        });
      },
      error => {
        console.error('Error al actualizar el producto:', error);       
      }
    );
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

  public cancelar(): void {
    this.router.navigate(['/productos/admin']);
  }
}
