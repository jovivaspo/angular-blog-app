import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  showSucess(message: string) {
    this.zone.run(() =>
      this.snackBar.open(message, '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['bg-success'],
      })
    );
  }

  showError(message: string) {
    this.zone.run(() =>
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['bg-error'],
      })
    );
  }
}
