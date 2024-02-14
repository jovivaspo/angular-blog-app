import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app-frontend';

  entreies = [
    {
      title: 'Login',
      description: 'Login',
      link: 'login',
    },
    {
      title: 'Register',
      description: 'Register',
      link: 'register',
    },
    {
      title: 'Users',
      description: 'Users',
      link: 'users',
    },
    {
      title: 'LogOut',
      description: 'Logout',
      link: 'logout',
    },
    {
      title: 'Update Profile',
      description: 'Update Profile',
      link: 'update-profile',
    },
  ];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    console.log('environment', environment.CONTROL);
  }

  navigateTo(value: string) {
    if (value !== 'logout') {
      this.router.navigate(['/' + value]);
      return;
    }
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
