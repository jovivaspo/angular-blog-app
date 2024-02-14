import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user.interface';

const BASE_URL = `${environment.API_URL}`;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userId: number = 0;
  private subscription: Subscription = new Subscription();
  protected baseUrl: string = BASE_URL;

  user: User = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      this.userId = parseInt(params['id']);
      this.usersService
        .findOne(this.userId)
        .pipe(map((user: User) => (this.user = user)))
        .subscribe();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
