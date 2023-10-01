import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  [x: string]: any;
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

  // Agregar métodos para realizar operaciones CRUD en la tabla "usuarios"
  // Por ejemplo, métodos para agregar, listar, actualizar y eliminar usuarios.

  // Función para agregar un usuario a la tabla "usuarios"
  agregarUsuario(usuario: Usuario) {
    const { nombre, correo, clave, pregunta_secreta, respuesta_secreta } = usuario;
    return this.db.executeSql(
      'INSERT INTO usuarios (nombre, correo, clave, pregunta_secreta, respuesta_secreta) VALUES (?, ?, ?, ?, ?)',
      [nombre, correo, clave, pregunta_secreta, respuesta_secreta]
    );
  }

  // Función para obtener todos los usuarios de la tabla "usuarios"
  obtenerUsuarios() {
    return this.db.executeSql('SELECT * FROM usuarios', []).then((data) => {
      const usuarios = [];
      for (let i = 0; i < data.rows.length; i++) {
        usuarios.push(data.rows.item(i));
      }
      return usuarios;
    });
  }

  // Función para obtener un usuario por su ID
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

  // Función para actualizar un usuario en la tabla "usuarios" por su ID
  actualizarUsuario(id: number, usuario: Usuario) {
    const { nombre, correo, clave, pregunta_secreta, respuesta_secreta } = usuario;
    return this.db.executeSql(
      'UPDATE usuarios SET nombre = ?, correo = ?, clave = ?, pregunta_secreta = ?, respuesta_secreta = ? WHERE id_usuario = ?',
      [nombre, correo, clave, pregunta_secreta, respuesta_secreta, id]
    );
  }

  // Función para eliminar un usuario de la tabla "usuarios" por su ID
  eliminarUsuario(id: number) {
    return this.db.executeSql('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
  }

  
}
