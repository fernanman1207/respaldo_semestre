import sqlite3 from 'sqlite3';

// Crea una instancia de la base de datos SQLite (en memoria en este ejemplo)
const db = new sqlite3.Database(':memory:'); // Cambia a la ubicación de tu base de datos si es necesario

// Define una función para crear la tabla de usuarios
function crearTablaUsuarios() {
  db.serialize(() => {
    // Crea la tabla de usuarios
    db.run(`
      CREATE TABLE IF NOT EXISTS Usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        contraseña TEXT NOT NULL
      )
    `);
  });
}

// Llama a la función para crear la tabla de usuarios
crearTablaUsuarios();
