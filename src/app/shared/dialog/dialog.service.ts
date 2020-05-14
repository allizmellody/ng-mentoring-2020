import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { DialogComponent } from './dialog.component';
import { IDialogData } from './dialog-data.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public open(data: IDialogData): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, { data });

    return dialogRef.afterClosed();
  }
}
