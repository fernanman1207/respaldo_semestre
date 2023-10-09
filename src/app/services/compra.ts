import { ProductoEnCarrito } from "./carrito";

export class Compra {
    id_compra: number = 0; // Inicializador para id_compra
    fecha_compra: Date = new Date(); // Inicializador para fecha_compra (se establece en la fecha actual por defecto)
    fecha_despacho: Date = new Date(); // Inicializador para fecha_despacho (se establece en la fecha actual por defecto)
    fecha_entrega: Date = new Date(); // Inicializador para fecha_entrega (se establece en la fecha actual por defecto)
    estado: string = ''; // Inicializador para estado
    costo_despacho: number = 0; // Inicializador para costo_despacho
    total: number = 0; // Inicializador para total
    carrito: ProductoEnCarrito[] = []; // Inicializador para carrito (un array vacío por defecto)
}
