import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

class CustomValidators {
  static passwordsMatch(control: FormControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordsMatch: true };
    }
    return null;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UsersService,
    private router: Router
  ) {}

  formRegister: FormGroup = new FormGroup({});

  ngOnInit() {
    this.formRegister = this.fb.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        email: [
          null,
          [Validators.required, Validators.email],
          [this.userExist.bind(this)],
        ],
        password: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validators: CustomValidators.passwordsMatch,
      }
    );
  }

  get nameField() {
    return this.formRegister.get('name');
  }

  get emailField() {
    return this.formRegister.get('email');
  }

  get passwordField() {
    return this.formRegister.get('password');
  }

  get confirmPasswordField() {
    return this.formRegister.get('confirmPassword');
  }

  onChange($event: any) {
    this.emailField?.updateValueAndValidity();
  }

  userExist(control: FormControl): Observable<ValidationErrors | null> {
    return from(this.userService.userExists(control.value)).pipe(
      map((exists: boolean) => {
        if (exists) {
          return { userExists: true };
        } else {
        }
        return null;
      })
    );
  }

  onSubmit(form: FormGroup) {
    if (this.formRegister.invalid) {
      return;
    }
    this.authService
      .register(form.value)
      .pipe(map((user: User) => this.router.navigate(['login'])))
      .subscribe();
  }
}
