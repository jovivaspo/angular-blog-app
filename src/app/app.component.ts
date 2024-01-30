import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
  ];

  constructor(private router: Router) {
    console.log('environment', environment.CONTROL);
  }

  navigateTo(link: string) {
    this.router.navigate(['../' + link]);
  }
}
