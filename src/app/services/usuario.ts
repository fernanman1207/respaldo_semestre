import { DatabaseService } from "./Database.Service";
export class Usuario {
    id_usuario!: number;
    rut!: string;
    dvrut!: string;
    nombre!: string;
    apellido!: string;
    telefono!: string;
    correo!: string;
    clave!: string;
    pregunta_secreta!: string;
    respuesta_secreta!: string;

}