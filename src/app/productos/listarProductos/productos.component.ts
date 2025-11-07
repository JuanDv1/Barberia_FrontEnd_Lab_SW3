import { Component } from '@angular/core';
import { Producto } from '../modelos/producto';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../servicios/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { Categoria } from '../../categorias/modelos/categoria';
import { categoriaService } from '../../categorias/servicios/categoria.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: Categoria[] = [];
  categoriaSeleccionada: Categoria | null = null;
  backgroundImageUrl: string = 'assets/images/background.jpg';

  constructor(
    private objProductoService: ProductoService, 
    private objCategoriaService: categoriaService
  ) {}
    
  ngOnInit(): void {
    // Cargar categorías
    this.objCategoriaService.getCategorias().subscribe(
      categorias => {
        console.log("Listando categorías");
        this.categorias = categorias;
      }
    );

    // Cargar productos
    this.objProductoService.getProductos().subscribe(
      productos => {
        console.log("Listando productos");
        this.productos = productos;
        this.productosFiltrados = productos; // Mostrar todos inicialmente
      }
    );
  }

  filtrarPorCategoria(categoria: Categoria | null): void {
    this.categoriaSeleccionada = categoria;
    
    if (categoria === null) {
      // Mostrar todos los productos
      this.productosFiltrados = this.productos;
    } else {
      // Filtrar por categoría seleccionada
      this.productosFiltrados = this.productos.filter(
        producto => producto.objCategoria?.id === categoria.id
      );
    }
    
    console.log(`Filtrando por categoría: ${categoria?.nombre || 'Todos'}`);
  }
}