import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/Database.Service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private router: Router,
    private databaseService: DatabaseService,
    private formBuilder: FormBuilder,
    private loginForms: FormGroup
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      const email = this.formControls['email'].value;
      const password = this.formControls['password'].value;

      try {
        const usuario = await this.databaseService.obtenerUsuarioPorCredenciales(email, password);
        if (usuario) {
          this.router.navigate(['/home']);
        } else {
          console.log('Credenciales inválidas');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    }
  }
}
