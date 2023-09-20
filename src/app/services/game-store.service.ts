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
    }).catch(error => {
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
      .catch(error => console.error('Error al crear la tabla de productos: ', error));
  }

  // Agrega métodos para realizar operaciones CRUD en la base de datos
  // Por ejemplo, métodos para agregar, listar, actualizar y eliminar productos.
}
