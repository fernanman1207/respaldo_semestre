import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Usuario } from './usuario';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private db!: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.initDatabase();
  }

  private initDatabase() {
    this.sqlite
      .create({
        name: 'tu_base_de_datos.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.createTableUsuarios();
        this.createTableProductos();
      })
      .catch((error: any) => {
        console.error('Error al abrir la base de datos: ', error);
      });
  }

  private createTableUsuarios() {
    this.db
      .executeSql(
        `
      CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        correo TEXT,
        clave TEXT,
        pregunta_secreta TEXT,
        respuesta_secreta TEXT
      )`,
        []
      )
      .then(() => console.log('Tabla de usuarios creada'))
      .catch((error: any) =>
        console.error('Error al crear la tabla de usuarios: ', error)
      );
  }

  private createTableProductos() {
    this.db
      .executeSql(
        `
      CREATE TABLE IF NOT EXISTS productos (
        id_prod INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        descripcion TEXT,
        precio REAL,
        stock INTEGER,
        foto TEXT
      )`,
        []
      )
      .then(() => console.log('Tabla de productos creada'))
      .catch((error: any) =>
        console.error('Error al crear la tabla de productos: ', error)
      );
  }

  // Métodos CRUD para la tabla "usuarios"

  agregarUsuario(usuario: Usuario) {
    const { nombre, correo, clave, pregunta_secreta, respuesta_secreta } = usuario;
    return this.db.executeSql(
      'INSERT INTO usuarios (nombre, correo, clave, pregunta_secreta, respuesta_secreta) VALUES (?, ?, ?, ?, ?)',
      [nombre, correo, clave, pregunta_secreta, respuesta_secreta]
    );
  }

  obtenerUsuarios() {
    return this.db.executeSql('SELECT * FROM usuarios', []).then((data) => {
      const usuarios = [];
      for (let i = 0; i < data.rows.length; i++) {
        usuarios.push(data.rows.item(i));
      }
      return usuarios;
    });
  }

  obtenerUsuarioPorId(id: number) {
    return this.db
      .executeSql('SELECT * FROM usuarios WHERE id_usuario = ?', [id])
      .then((data) => {
        if (data.rows.length > 0) {
          return data.rows.item(0);
        }
        return null;
      });
  }

  actualizarUsuario(id: number, usuario: Usuario) {
    const { nombre, correo, clave, pregunta_secreta, respuesta_secreta } = usuario;
    return this.db.executeSql(
      'UPDATE usuarios SET nombre = ?, correo = ?, clave = ?, pregunta_secreta = ?, respuesta_secreta = ? WHERE id_usuario = ?',
      [nombre, correo, clave, pregunta_secreta, respuesta_secreta, id]
    );
  }

  eliminarUsuario(id: number) {
    return this.db.executeSql('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
  }

  // Métodos CRUD para la tabla "productos"

  agregarProducto(producto: Producto) {
    const { nombre, descripcion, precio, stock, foto } = producto;
    return this.db.executeSql(
      'INSERT INTO productos (nombre, descripcion, precio, stock, foto) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, stock, foto]
    );
  }

  obtenerProductos() {
    return this.db.executeSql('SELECT * FROM productos', []).then((data) => {
      const productos = [];
      for (let i = 0; i < data.rows.length; i++) {
        productos.push(data.rows.item(i));
      }
      return productos;
    });
  }

  obtenerProductoPorId(id: number) {
    return this.db
      .executeSql('SELECT * FROM productos WHERE id_prod = ?', [id])
      .then((data) => {
        if (data.rows.length > 0) {
          return data.rows.item(0);
        }
        return null;
      });
  }

  actualizarProducto(id: number, producto: Producto) {
    const { nombre, descripcion, precio, stock, foto } = producto;
    return this.db.executeSql(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, foto = ? WHERE id_prod = ?',
      [nombre, descripcion, precio, stock, foto, id]
    );
  }

  eliminarProducto(id: number) {
    return this.db.executeSql('DELETE FROM productos WHERE id_prod = ?', [id]);
  }
}
