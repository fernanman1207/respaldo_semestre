import { Injectable } from '@angular/core';
import { Usuario } from './game-store.service';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [];
  private lastId: number = 0;

  constructor() { }

  // Función para crear un nuevo usuario
  crearUsuario(usuario: Usuario): Usuario {
    usuario.id = ++this.lastId;
    this.usuarios.push(usuario);
    return usuario;
  }

  // Función para obtener todos los usuarios
  obtenerUsuarios(): Usuario[] {
    return this.usuarios;
  }

  // Función para obtener un usuario por ID
  obtenerUsuarioPorId(id: number): Usuario {
    return this.usuarios.find(usuario => usuario.id === id);
  }

  // Función para actualizar un usuario
  actualizarUsuario(id: number, usuarioActualizado: Usuario): Usuario {
    const usuario = this.obtenerUsuarioPorId(id);
    if (usuario) {
      usuario.nombre = usuarioActualizado.nombre;
      usuario.email = usuarioActualizado.email;
      usuario.contraseña = usuarioActualizado.contraseña;
      return usuario;
    }
    return null;
  }

  // Función para eliminar un usuario por ID
  eliminarUsuario(id: number): boolean {
    const index = this.usuarios.findIndex(usuario => usuario.id === id);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      return true;
    }
    return false;
  }
}
