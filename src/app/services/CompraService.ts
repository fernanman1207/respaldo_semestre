import { Injectable } from '@angular/core';
import { Compra } from './compra';





@Injectable({
  providedIn: 'root',
})
export class CompraService {
  private compras: Compra[] = [];
  private lastId: number = 0;

  constructor() {}

  // Función para agregar una compra
  agregarCompra(compra: Compra): Compra {
    compra.id_compra = ++this.lastId;
    this.compras.push(compra);
    return compra;
  }

  // Función para obtener todas las compras
  obtenerCompras(): Compra[] {
    return this.compras;
  }

  // Función para obtener una compra por ID
  obtenerCompraPorId(id: number): Compra | undefined {
    return this.compras.find((compra) => compra.id_compra === id);
  }

  // Función para actualizar una compra
  actualizarCompra(id: number, compraActualizada: Compra): Compra | undefined {
    const compra = this.obtenerCompraPorId(id);
    if (compra) {
      compra.fecha_compra = compraActualizada.fecha_compra;
      compra.fecha_despacho = compraActualizada.fecha_despacho;
      compra.fecha_entrega = compraActualizada.fecha_entrega;
      compra.estado = compraActualizada.estado;
      compra.costo_despacho = compraActualizada.costo_despacho;
      compra.total = compraActualizada.total;
      compra.carrito = compraActualizada.carrito;
      return compra;
    }
    return undefined;
  }

  // Función para eliminar una compra por ID
  eliminarCompra(id: number): boolean {
    const index = this.compras.findIndex((compra) => compra.id_compra === id);
    if (index !== -1) {
      this.compras.splice(index, 1);
      return true;
    }
    return false;
  }
}
