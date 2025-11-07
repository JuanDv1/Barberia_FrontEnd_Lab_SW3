import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private esAdministradorSubject = new BehaviorSubject<boolean>(false);
  public esAdministrador$: Observable<boolean> = this.esAdministradorSubject.asObservable();

  constructor() {}

  toggleRol(): void {
    const valorActual = this.esAdministradorSubject.value;
    const nuevoValor = !valorActual;
    console.log('Toggle rol - Valor actual:', valorActual, '-> Nuevo valor:', nuevoValor);
    this.esAdministradorSubject.next(nuevoValor);
  }

  setRol(esAdministrador: boolean): void {
    this.esAdministradorSubject.next(esAdministrador);
  }

  esAdministrador(): boolean {
    return this.esAdministradorSubject.value;
  }

  getRolActual(): string {
    return this.esAdministradorSubject.value ? 'Administrador' : 'Cliente';
  }
}
