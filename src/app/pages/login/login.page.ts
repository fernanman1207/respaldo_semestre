import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo Router
import { DatabaseService, Usuario } from 'src/app/services/Database.Service'; // Reemplaza 'ruta-hacia-tu-database-service' con la ruta real a tu servicio DatabaseService
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

schemas:[
  CUSTOM_ELEMENTS_SCHEMA
]

@Component({
  selector: 'app-login',
  templateUrl: '/login.page.html',
  styleUrls: ['/login.page.scss'],
})
export class LoginPage implements OnInit {
  [x: string]: any;
  loginForm: FormGroup | undefined;
  isSubmitted = false;

  constructor(
    private router: Router, // Inyecta el Router para gestionar la navegación
    private databaseService: DatabaseService, // Inyecta el servicio DatabaseService
    private formBuilder: FormBuilder,
    private usuario: Usuario
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Correo: ['', [Validators.required, Validators.email]],
      Clave: ['', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm!.controls;
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm!.valid) {
      const email = this.formControls['email'].value;
      const password = this.formControls['password'].value;

      // Aquí deberías llamar a la función de inicio de sesión en tu servicio UsuarioService
      // Por ejemplo:
      const usuario = this.databaseService.obtenerUsuarioPorId;

      if (await newFunction(usuario)) {
        // Inicio de sesión exitoso
        // Puedes redirigir al usuario a la página de inicio o a la página deseada
        this.router.navigate(['/home']);
      } else {
        // Inicio de sesión fallido
        // Puedes mostrar un mensaje de error al usuario
        console.log('Credenciales inválidas');
      }
    }

    function newFunction(usuario: (id: number) => Promise<any>) {
      return newFunction(usuario);
    }
  }
}
