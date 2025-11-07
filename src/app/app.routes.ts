import { Routes } from '@angular/router';
import { ProductosComponent } from './productos/listarProductos/productos.component';
import { ProductosComponent as ProductosAdminComponent } from './productos/listarProductosAdmin/productos.component';
import { FormComponent as FormProductoComponent } from './productos/crearProductos/form.component';
import { FormComponent as FormActualizarProductoComponent } from './productos/actualizarProductos/form.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { CuponesComponent } from './pages/cupones/cupones.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';

export const routes: Routes = [
    {path: '', redirectTo: '/productos/listar', pathMatch: 'full'},
    {path: 'ofertas', component: OfertasComponent},
    {path: 'cupones', component: CuponesComponent},
    {path: 'ayuda', component: AyudaComponent},
    {path: 'productos/listar', component: ProductosComponent},
    {path: 'productos/admin', component: ProductosAdminComponent},
    {path: 'productos/crear', component: FormProductoComponent},
    {path: 'productos/actualizar/:id', component: FormActualizarProductoComponent}
];
