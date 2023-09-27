import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
  private preguntas: Pregunta[] = [];
  private lastId: number = 0;

  constructor() {}

  // Función para agregar una pregunta
  agregarPregunta(pregunta: Pregunta): Pregunta {
    pregunta.id_preg = ++this.lastId;
    this.preguntas.push(pregunta);
    return pregunta;
  }

  // Función para obtener todas las preguntas
  obtenerPreguntas(): Pregunta[] {
    return this.preguntas;
  }

  // Función para obtener una pregunta por ID
  obtenerPreguntaPorId(id: number): Pregunta | undefined {
    return this.preguntas.find((pregunta) => pregunta.id_preg === id);
  }

  // Función para actualizar una pregunta
  actualizarPregunta(id: number, preguntaActualizada: Pregunta): Pregunta | undefined {
    const pregunta = this.obtenerPreguntaPorId(id);
    if (pregunta) {
      pregunta.pregunta = preguntaActualizada.pregunta;
      return pregunta;
    }
    return undefined;
  }

  // Función para eliminar una pregunta por ID
  eliminarPregunta(id: number): boolean {
    const index = this.preguntas.findIndex((pregunta) => pregunta.id_preg === id);
    if (index !== -1) {
      this.preguntas.splice(index, 1);
      return true;
    }
    return false;
  }
}
