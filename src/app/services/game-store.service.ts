import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class GameStoreService {
  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.initDatabase();
  }

  private initDatabase() {
    this.sqlite.create({
      name: 'gamestore.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.createTables();
    }).catch((error: any) => {
      console.error('Error al abrir la base de datos: ', error);
    });
  }

  private createTables() {
    this.db.executeSql(`
      CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        descripcion TEXT,
        precio REAL,
        stock INTEGER
      )`, [])
      .then(() => console.log('Tabla de productos creada'))
      .catch((error: any) => console.error('Error al crear la tabla de productos: ', error));
  }

  // Agrega métodos para realizar operaciones CRUD en la base de datos
  // Por ejemplo, métodos para agregar, listar, actualizar y eliminar productos.

  // Función para agregar un producto
  agregarProducto(producto: any) {
    const { nombre, descripcion, precio, stock } = producto;
    return this.db.executeSql(
      'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, precio, stock]
    );
  }

  // Función para listar todos los productos
  listarProductos() {
    return this.db.executeSql('SELECT * FROM productos', []).then((data: { rows: { length: number; item: (arg0: number) => any; }; }) => {
      const productos = [];
      for (let i = 0; i < data.rows.length; i++) {
        productos.push(data.rows.item(i));
      }
      return productos;
    });
  }

  // Función para actualizar un producto
  actualizarProducto(id: number, producto: any) {
    const { nombre, descripcion, precio, stock } = producto;
    return this.db.executeSql(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?',
      [nombre, descripcion, precio, stock, id]
    );
  }

  // Función para eliminar un producto por su ID
  eliminarProducto(id: number) {
    return this.db.executeSql('DELETE FROM productos WHERE id = ?', [id]);
  }
}

export class Usuario {
  id: number;
  nombre: string;
  email: string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [];
  private lastId: number = 0;

  constructor() {}

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







