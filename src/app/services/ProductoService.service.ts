import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
  import { Producto } from './producto';

  import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productos: Producto[] = [];
  private lastId: number = 0;

  constructor() {}

  // Función para agregar un producto
  agregarProducto(producto: Producto): Producto {
    producto.id_prod = ++this.lastId;
    this.productos.push(producto);
    return producto;
  }

  // Función para obtener todos los productos
  obtenerProductos(): Producto[] {
    return this.productos;
  }

  // Función para obtener un producto por ID
  obtenerProductoPorId(id: number): Producto | undefined {
    return this.productos.find((producto) => producto.id_prod === id);
  }

  // Función para actualizar un producto
  actualizarProducto(id: number, productoActualizado: Producto): Producto | undefined {
    const producto = this.obtenerProductoPorId(id);
    if (producto) {
      producto.nombre = productoActualizado.nombre;
      producto.descripcion = productoActualizado.descripcion;
      producto.precio = productoActualizado.precio;
      producto.stock = productoActualizado.stock;
      producto.foto = productoActualizado.foto;
      return producto;
    }
    return undefined;
  }

  // Función para eliminar un producto por ID
  eliminarProducto(id: number): boolean {
    const index = this.productos.findIndex((producto) => producto.id_prod === id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      return true;
    }
    return false;
  }
}
