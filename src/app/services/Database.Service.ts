import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

export class Pregunta {
  private _id_preg: number | undefined;
  pregunta: any;
public get id_preg(): number | undefined {
  return this._id_preg;
}
public set id_preg(value: number | undefined) {
  this._id_preg = value;
}
  pregunta_secreta: string='';
}

export class Usuario {
  id_usuario: number = 0;
  nombre: string='';
  correo: string ='';
  clave: string = '';
  respuesta_secreta: string = '';
  pregunta_secreta: string = '';
}

export class Producto {
  id_prod: number = 0; // Inicializador para id_prod
  nombre: string = ''; // Inicializador para nombre
  descripcion: string = ''; // Inicializador para descripcion
  precio: number = 0; // Inicializador para precio
  stock: number = 0; // Inicializador para stock
  foto: string = ''; // Inicializador para foto (puedes usar una URL o una representación de imagen según tu necesidad)
}

export class ProductoEnCarrito {
  id_producto: number = 0; // Inicializador para id_producto
  nombre_producto: string = ''; // Inicializador para nombre_producto
  cantidad: number = 0; // Inicializador para cantidad
  precio_unitario: number = 0; // Inicializador para precio_unitario
}


export class Compra {
  id_compra: number;
  fecha_compra: Date;
  fecha_despacho: Date;
  fecha_entrega: Date;
  estado: string;
  costo_despacho: number;
  total: number;
  constructor(id_compra: number, fecha_compra: Date, fecha_despacho: Date, fecha_entrega: Date, estado: string, costo_despacho: number, total: number) {
    this.id_compra = id_compra;
    this.fecha_compra = fecha_compra;
    this.fecha_despacho = fecha_despacho;
    this.fecha_entrega = fecha_entrega;
    this.estado = estado;
    this.costo_despacho = costo_despacho;
    this.total = total;
  }
}

@Injectable({
  providedIn: 'root',
})


export class DatabaseService {
  [x: string]: any;
  private db!: SQLiteObject;
  preguntas: Pregunta[]=[];
  

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
        this.createTableCompra();
        this.createTableCarrito();

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
  private createTableCompra() {
    this.db
      .executeSql(
        `
      CREATE TABLE IF NOT EXISTS compras (
        id_compra INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha_compra TEXT,
        fecha_despacho TEXT,
        fecha_entrega TEXT,
        estado TEXT,
        costo_despacho REAL,
        total REAL
      )`,
        []
      )
      .then(() => console.log('Tabla de compras creada'))
      .catch((error: any) =>
        console.error('Error al crear la tabla de compras: ', error)
      );
  }

  private createTableCarrito() {
    this.db
      .executeSql(
        `
      CREATE TABLE IF NOT EXISTS carrito (
        id_carrito INTEGER PRIMARY KEY AUTOINCREMENT,
        id_producto INTEGER,
        nombre_producto TEXT,
        cantidad INTEGER,
        precio_unitario REAL
      )`,
        []
      )
      .then(() => console.log('Tabla de carrito creada'))
      .catch((error: any) =>
        console.error('Error al crear la tabla de carrito: ', error)
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
      .executeSql('INSERT INTO preguntas (pregunta) VALUES (?)', [pregunta])
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
    return this.preguntas.find((pregunta: Pregunta) => pregunta.id_preg === id);
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
        const compra = new Compra();
        compra.id_compra = row.id_compra;
        compra.fecha_compra = new Date(row.fecha_compra);
        compra.fecha_despacho = new Date(row.fecha_despacho);
        compra.fecha_entrega = new Date(row.fecha_entrega);
        compra.estado = row.estado;
        compra.costo_despacho = row.costo_despacho;
        compra.total = row.total;
  
        // Puedes cargar el array "carrito" aquí si es necesario
        // Por ejemplo: compra.carrito = obtenerCarritoPorIdCompra(compra.id_compra);
  
        compras.push(compra);
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