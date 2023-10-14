import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService, Usuario } from 'src/app/services/Database.Service'; // Reemplaza 'ruta-hacia-tu-database-service' con la ruta real a tu servicio DatabaseService

schemas:[
  CUSTOM_ELEMENTS_SCHEMA
]

@Component({
  selector: 'app-register',
  templateUrl: '/register.page.html',
  styleUrls: ['/register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  isSubmitted = false;

  validation_messages = {
    nombre: [
      { type: 'required', message: 'El nombre es obligatorio' }
    ],
    correo: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'Por favor, ingresa un correo válido' }
    ],
    clave: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ],
    preguntaSecreta: [
      { type: 'required', message: 'La pregunta secreta es obligatoria' }
    ],
    respuestaSecreta: [
      { type: 'required', message: 'La respuesta secreta es obligatoria' }
    ]
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
      const nuevoUsuario: Usuario = new Usuario(); // Crea una nueva instancia de Usuario
      nuevoUsuario.nombre = this.registerForm.value.nombre;
      nuevoUsuario.correo = this.registerForm.value.correo;
      nuevoUsuario.clave = this.registerForm.value.clave;
      nuevoUsuario.pregunta_secreta = this.registerForm.value.preguntaSecreta;
      nuevoUsuario.respuesta_secreta = this.registerForm.value.respuestaSecreta;

      this.databaseService.agregarUsuario({
          nombre: this.registerForm.value.nombre,
          correo: this.registerForm.value.correo,
          clave: this.registerForm.value.clave,
          pregunta_secreta: this.registerForm.value.preguntaSecreta,
          respuesta_secreta: this.registerForm.value.respuestaSecreta,
          id_usuario: 0
        }).then(() => {
        // El usuario se ha registrado con éxito en la base de datos.
        // Puedes redirigir al usuario a una página de inicio de sesión u otra página relevante.
        console.log('Usuario registrado:', {
            nombre: this.registerForm.value.nombre,
            correo: this.registerForm.value.correo,
            clave: this.registerForm.value.clave,
            pregunta_secreta: this.registerForm.value.preguntaSecreta,
            respuesta_secreta: this.registerForm.value.respuestaSecreta,
            id_usuario: 0
          });
        // Agrega aquí la lógica de redirección si es necesario.
        this.databaseService.agregarUsuario(nuevoUsuario)
        .then(() => {
          // El usuario se ha registrado con éxito en la base de datos.
          console.log('Usuario registrado:', Usuario);

          // Agrega aquí la lógica de redirección si es necesario.
        })
        .catch((error) => {
          // Manejo de errores en caso de que falle la inserción en la base de datos.
          console.error('Error al registrar el usuario:', error);}
        ,)});
    }
  }
}
