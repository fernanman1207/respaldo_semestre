import { ProductoEnCarrito } from "./carrito";

export class Compra {
    id_compra!: number;
    fecha_compra!: Date;
    fecha_despacho!: Date;
    fecha_entrega!: Date;
    estado!: string;
    costo_despacho!: number;
    total!: number;
    carrito!: ProductoEnCarrito[];
  }