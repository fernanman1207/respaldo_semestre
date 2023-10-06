import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo Router
import { DatabaseService } from 'src/app/services/Database.Service'; // Reemplaza 'ruta-hacia-tu-database-service' con la ruta real a tu servicio DatabaseService
import { Tab1Page } from 'src/app/tab1/tab1.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  correo: string | undefined;
  clave: string | undefined;

  constructor(
    private router: Router, // Inyecta el Router para gestionar la navegación
    private databaseService: DatabaseService // Inyecta el servicio DatabaseService
  ) {}

  onLogin() {
    // Verifica las credenciales en la base de datos
    // Verifica las credenciales en la base de datos
    this.databaseService['verificarCredenciales'](this.correo, this.clave)
      .then((usuario: any): void => {
        if (usuario) {
          // Las credenciales son válidas, redirige al usuario a otra página
          this.router.navigate(['/Inicio']); // Reemplaza '/inicio' con la ruta a la página que desees mostrar después de iniciar sesión
        } else {
          // Las credenciales son inválidas, muestra un mensaje de error o realiza alguna acción adecuada
          console.log('Credenciales inválidas');
        }
      });
  }
}
