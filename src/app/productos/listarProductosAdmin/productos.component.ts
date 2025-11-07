import { Component } from '@angular/core';
import { Producto } from '../modelos/producto';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../servicios/producto.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, SweetAlert2Module],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  productos: Producto[] = [];

  constructor(
    private objProductoService: ProductoService,
    private router: Router
  ) {}
    
  ngOnInit(): void {
    this.objProductoService.getProductos().subscribe(
      productos => {
        console.log("Listando productos");
        this.productos = productos;
      }
    );
  }

  editarProducto(id: number): void {
    this.router.navigate(['/productos/actualizar', id]);
  }

  eliminarProducto(id: number): void {
    Swal.fire({
      title: '¿Desea eliminar el producto?',
      text: "La eliminación no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.objProductoService.deleteProducto(id).subscribe(() => {
          // Eliminar de ambos arrays
          this.productos = this.productos.filter(producto => producto.id !== id);          
          Swal.fire(
            'Eliminado',
            'El producto ha sido eliminado exitosamente',
            'success'
          );
        });
      }
    });
  }
}