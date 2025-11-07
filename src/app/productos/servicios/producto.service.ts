import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Producto } from '../modelos/producto';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private httpHeaders = { 'Content-Type': 'application/json' };
  private urlEndPoint: string = 'http://localhost:5000/api/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    console.log('Listando productos desde el servicio');
    return this.http
      .get<Producto[]>(this.urlEndPoint)
      .pipe(catchError(this.handleError));
  }

  create(producto: Producto, imageFile: File | null): Observable<Producto> {
    console.log('Creando producto desde el servicio');
    // Crear FormData
    const formData = new FormData();

    // Asegurar que estado sea un booleano válido
    const estadoBoolean = Boolean(producto.estado);

    // Agregar el objeto producto como JSON string
    const productoData = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      estado: estadoBoolean,
      imagen: '', // Se dejará vacío porque se envía el archivo real
      objCategoria: producto.objCategoria,
    };

    formData.append('producto', JSON.stringify(productoData));
    // Agregar la imagen si existe
    if (imageFile) {
      formData.append('imagen', imageFile, imageFile.name);
    }
    return this.http
      .post<Producto>(this.urlEndPoint, formData)
      .pipe(catchError(this.handleError));
  }

  update(producto: Producto, imageFile: File | null = null): Observable<Producto> {
    console.log('Actualizando producto desde el servicio', producto);
    
    // Crear FormData
    const formData = new FormData();

    // Asegurar que estado sea un booleano válido
    const estadoBoolean = Boolean(producto.estado);

    // Agregar el objeto producto como JSON string
    const productoData = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      estado: estadoBoolean,
      imagen: producto.imagen || '', 
      objCategoria: producto.objCategoria,
    };

    formData.append('producto', JSON.stringify(productoData));
    
    // Agregar la imagen si existe
    if (imageFile) {
      formData.append('imagen', imageFile, imageFile.name);
    }
    
    return this.http
      .put<Producto>(`${this.urlEndPoint}/${producto.id}`, formData)
      .pipe(catchError(this.handleError));
  }

  deleteProducto(id: number): Observable<void> {
    console.log('Eliminando producto desde el servicio', id);
    return this.http
      .delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  getProductoById(id: number): Observable<Producto> {
    console.log('Obteniendo producto con ID:', id);
    return this.http
      .get<Producto>(`${this.urlEndPoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400 || error.status === 404) {
      const codigoError = error.error.codigoError;
      const mensajeError = error.error.mensaje;
      const codigoHttp = error.error.codigoHttp;
      const url = error.error.url;
      const metodo = error.error.metodo;

      console.error(
        `Error ${codigoHttp} en ${metodo} ${url}: ${mensajeError} (Código: ${codigoError})`
      );

      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: mensajeError,
        confirmButtonText: 'Cerrar',
      });

      return throwError(() => new Error(mensajeError));
    } else {
      return throwError(() => new Error('Ocurrió un error inesperado.'));
    }
  }
}
