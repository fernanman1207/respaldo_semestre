// Importa las dependencias necesarias para la base de datos SQLite en Ionic
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Usuario } from './usuario';



export class UsuarioService {
  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.initDatabase();
  }

  private initDatabase() {
    this.sqlite.create({
      name: 'tu_base_de_datos.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.createTable();
    }).catch((error: any) => {
      console.error('Error al abrir la base de datos: ', error);
    });
  }

  private createTable() {
    this.db.executeSql(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        rut TEXT NOT NULL,
        dvrut TEXT NOT NULL,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        telefono TEXT,
        correo TEXT NOT NULL,
        clave TEXT NOT NULL,
        respuesta TEXT NOT NULL
      )`, [])
      .then(() => console.log('Tabla de usuarios creada'))
      .catch((error: any) => console.error('Error al crear la tabla de usuarios: ', error));
  }

  // Función para agregar un usuario
  agregarUsuario(usuario: Usuario) {
    return this.db.executeSql(
      'INSERT INTO usuarios (rut, dvrut, nombre, apellido, telefono, correo, clave, respuesta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [usuario.rut, usuario.dvrut, usuario.nombre, usuario.apellido, usuario.telefono, usuario.correo, usuario.clave, usuario.respuesta]
    );
  }

  // Función para obtener todos los usuarios
  obtenerUsuarios(): Promise<Usuario[]> {
    return this.db.executeSql('SELECT * FROM usuarios', []).then((data) => {
      const usuarios: Usuario[] = [];
      for (let i = 0; i < data.rows.length; i++) {
        const item = data.rows.item(i);
        usuarios.push(item);
      }
      return usuarios;
    });
  }

  // Función para actualizar un usuario
  actualizarUsuario(usuario: Usuario) {
    return this.db.executeSql(
      'UPDATE usuarios SET rut = ?, dvrut = ?, nombre = ?, apellido = ?, telefono = ?, correo = ?, clave = ?, respuesta = ? WHERE id_usuario = ?',
      [usuario.rut, usuario.dvrut, usuario.nombre, usuario.apellido, usuario.telefono, usuario.correo, usuario.clave, usuario.respuesta, usuario.id_usuario]
    );
  }

  // Función para eliminar un usuario por su ID
  eliminarUsuario(id_usuario: number) {
    return this.db.executeSql('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);
  }
}
