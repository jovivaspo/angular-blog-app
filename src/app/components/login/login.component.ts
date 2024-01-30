import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin: FormGroup = new FormGroup({});
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  get emailField() {
    return this.formLogin.get('email');
  }
  get passwordField() {
    return this.formLogin.get('password');
  }

  onSubmit(form: FormGroup) {
    if (this.formLogin.invalid) {
      return;
    }
    // TODO manejo de errores por consola, dentro del subscribe y uso del tap y redirección al perfil del usuario
    this.authService
      .login(this.formLogin.value)
      .pipe(map((token) => this.router.navigate(['/'])))
      .subscribe();
  }
}
