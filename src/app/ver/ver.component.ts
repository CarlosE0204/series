import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
  export interface DialogData {
    pelicula: any;
    name: string;
  }

@Component({
  selector: 'app-ver',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
    MatDialogTitle, MatDialogContent, MatDialogActions, CommonModule],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.css'
})
export class VerComponent {
  readonly dialogRef = inject(MatDialogRef<HomeComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly pelicula = model(this.data.pelicula);

  cerrar(): void {
    this.dialogRef.close();
  }

}
