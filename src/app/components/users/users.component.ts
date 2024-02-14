import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { UsersPaginated } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dataSource: UsersPaginated = {} as UsersPaginated;
  displayedColumns: string[] = ['id', 'name', 'email', 'role'];

  pageEvent: PageEvent = {} as PageEvent;
  pageSizeOptions = [5, 10, 25, 100];

  filterValue: string = '';

  constructor(
    private userService: UsersService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.userService
      .findAll()
      .pipe(
        map((usersPaginated: UsersPaginated) => {
          this.dataSource = usersPaginated;
          return usersPaginated;
        })
      )
      .subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex + 1;
    const size = event.pageSize;

    if (!this.filterValue) {
      this.userService
        .findAll(page, size)
        .pipe(
          map((usersPaginated: UsersPaginated) => {
            this.dataSource = usersPaginated;
            return usersPaginated;
          })
        )
        .subscribe();
    } else {
      this.userService
        .paginateByName(page, size, this.filterValue)
        .pipe(
          map((usersPaginated: UsersPaginated) => {
            this.dataSource = usersPaginated;
            return usersPaginated;
          })
        )
        .subscribe();
    }
  }

  findByName(name: string) {
    this.userService
      .paginateByName(1, 10, name)
      .pipe(
        map((usersPaginated: UsersPaginated) => {
          this.dataSource = usersPaginated;
          return usersPaginated;
        })
      )
      .subscribe();
  }

  navigateToProfile(id: number) {
    this.router.navigate([id], { relativeTo: this.activateRoute });
  }
}
