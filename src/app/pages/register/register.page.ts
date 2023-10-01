import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/Database.Service'; // Reemplaza 'ruta-hacia-tu-database-service' con la ruta real a tu servicio DatabaseService
import { Usuario } from 'src/app/services/usuario'; // Reemplaza 'ruta-hacia-tu-modelo-usuario' con la ruta real a tu modelo Usuario

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  isSubmitted = false;

  validation_messages = {
    // Define tus mensajes de validación aquí...
  };

  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService // Inyecta el servicio DatabaseService
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      clave: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      preguntaSecreta: ['', Validators.required],
      respuestaSecreta: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.registerForm.valid) {

      this.databaseService.agregarUsuario({
          nombre: this.registerForm.value.nombre,
          correo: this.registerForm.value.correo,
          clave: this.registerForm.value.clave,
          pregunta_secreta: this.registerForm.value.preguntaSecreta,
          respuesta_secreta: this.registerForm.value.respuestaSecreta,
          id_usuario: 0,
          rut: '',
          dvrut: '',
          apellido: '',
          telefono: ''
        }).then(() => {
        // El usuario se ha registrado con éxito en la base de datos.
        // Puedes redirigir al usuario a una página de inicio de sesión u otra página relevante.
        console.log('Usuario registrado:', {
            nombre: this.registerForm.value.nombre,
            correo: this.registerForm.value.correo,
            clave: this.registerForm.value.clave,
            pregunta_secreta: this.registerForm.value.preguntaSecreta,
            respuesta_secreta: this.registerForm.value.respuestaSecreta,
            id_usuario: 0,
            rut: '',
            dvrut: '',
            apellido: '',
            telefono: ''
          });
        // Agrega aquí la lógica de redirección si es necesario.
      });
    }
  }
}
