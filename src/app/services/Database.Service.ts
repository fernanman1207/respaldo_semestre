import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Usuario } from './usuario';
import { Producto } from './producto';
import { Pregunta } from './pregexport';
import { Compra } from './compra';
import { ProductoEnCarrito } from './carrito';

@Injectable({
  providedIn: 'root',
})


export class DatabaseService {
  private db!: SQLiteObject;
  preguntas: any;

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
        this.createTablePreguntas();
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

  private createTablePreguntas() {
    this.db
      .executeSql(
        `
      CREATE TABLE IF NOT EXISTS preguntas (
        id_preg INTEGER PRIMARY KEY AUTOINCREMENT,
        pregunta TEXT
      )`,
        []
      )
      .then(() => console.log('Tabla de preguntas creada'))
      .catch((error: any) =>
        console.error('Error al crear la tabla de preguntas: ', error)
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
      const productos: any[] | PromiseLike<any[]> = [];
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

  //operaciones CRUD Preguntas
  agregarPregunta(pregunta: Pregunta): Promise<void> {
    return this.db
      .executeSql('INSERT INTO preguntas (pregunta) VALUES (?)', [pregunta.pregunta])
      .then(() => console.log('Pregunta agregada a la base de datos'))
      .catch((error: any) =>
        console.error('Error al agregar la pregunta: ', error)
      );
  }

  // Función para obtener todas las preguntas
  obtenerPreguntas(): Pregunta[] {
    return this.preguntas;
  }

  obtenerPreguntaPorId(id: number): Pregunta | undefined {
    return this.preguntas.find((pregunta: { id_preg: number; }) => pregunta.id_preg === id);
  }

  actualizarPregunta(id: number, preguntaActualizada: Pregunta): Promise<void> {
    return this.db
      .executeSql(
        'UPDATE preguntas SET pregunta = ? WHERE id_preg = ?',
        [preguntaActualizada.pregunta, id]
      )
      .then(() => console.log('Pregunta actualizada en la base de datos'))
      .catch((error: any) =>
        console.error('Error al actualizar la pregunta: ', error)
      );
  }

   //acciones crud compra
   agregarCompra(compra: Compra) {
    const {
      fecha_compra,
      fecha_despacho,
      fecha_entrega,
      estado,
      costo_despacho,
      total,
    } = compra;
    return this.db.executeSql(
      'INSERT INTO compras (fecha_compra, fecha_despacho, fecha_entrega, estado, costo_despacho, total) VALUES (?, ?, ?, ?, ?, ?)',
      [
        fecha_compra.toISOString(),
        fecha_despacho.toISOString(),
        fecha_entrega.toISOString(),
        estado,
        costo_despacho,
        total,
      ]
    );
  }
  obtenerCompras() {
    return this.db.executeSql('SELECT * FROM compras', []).then((data) => {
      const compras: Compra[] = [];
      for (let i = 0; i < data.rows.length; i++) {
        const row = data.rows.item(i);
        compras.push({
          id_compra: row.id_compra,
          fecha_compra: new Date(row.fecha_compra),
          fecha_despacho: new Date(row.fecha_despacho),
          fecha_entrega: new Date(row.fecha_entrega),
          estado: row.estado,
          costo_despacho: row.costo_despacho,
          total: row.total,
          _carrito: [],
          carrito: []
        });
      }
      return compras;
    });
  }
  obtenerCompraPorId(id: number) {
    return this.db
      .executeSql('SELECT * FROM compras WHERE id_compra = ?', [id])
      .then((data) => {
        if (data.rows.length > 0) {
          const row = data.rows.item(0);
          return {
            id_compra: row.id_compra,
            fecha_compra: new Date(row.fecha_compra),
            fecha_despacho: new Date(row.fecha_despacho),
            fecha_entrega: new Date(row.fecha_entrega),
            estado: row.estado,
            costo_despacho: row.costo_despacho,
            total: row.total,
          };
        }
        return null;
      });
  }
  actualizarCompra(id: number, compra: Compra) {
    const {
      fecha_compra,
      fecha_despacho,
      fecha_entrega,
      estado,
      costo_despacho,
      total,
    } = compra;
    return this.db.executeSql(
      'UPDATE compras SET fecha_compra = ?, fecha_despacho = ?, fecha_entrega = ?, estado = ?, costo_despacho = ?, total = ? WHERE id_compra = ?',
      [
        fecha_compra.toISOString(),
        fecha_despacho.toISOString(),
        fecha_entrega.toISOString(),
        estado,
        costo_despacho,
        total,
        id,
      ]
    );
  }
  eliminarCompra(id: number) {
    return this.db.executeSql('DELETE FROM compras WHERE id_compra = ?', [id]);
  }
  // Operaciones CRUD para la tabla "carrito" (ProductoEnCarrito)
agregarProductoAlCarrito(producto: ProductoEnCarrito) {
  const { id_producto, nombre_producto, cantidad, precio_unitario } = producto;
  return this.db.executeSql(
    'INSERT INTO carrito (id_producto, nombre_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
    [id_producto, nombre_producto, cantidad, precio_unitario]
  );
}
obtenerProductosEnCarrito() {
  return this.db.executeSql('SELECT * FROM carrito', []).then((data) => {
    const productosEnCarrito: ProductoEnCarrito[] = [];
    for (let i = 0; i < data.rows.length; i++) {
      const row = data.rows.item(i);
      productosEnCarrito.push({
        id_producto: row.id_producto,
        nombre_producto: row.nombre_producto,
        cantidad: row.cantidad,
        precio_unitario: row.precio_unitario,
      });
    }
    return productosEnCarrito;
  });
  
}}