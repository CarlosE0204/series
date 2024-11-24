import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
  export interface DialogData {
    pelicula: any;
    name: string;
  }
@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {
  readonly dialogRef = inject(MatDialogRef<HomeComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly pelicula = model(this.data.pelicula);
  peli={...this.data.pelicula};
  generos=this.data.pelicula.genres.join(',');
  errorTitulo=false;
  errorFecha=false;
  errorTipo=false;
  errorGeneros=false;
  errorDescripcion=false;
  errorUrl=false;

  cerrar(): void {
    this.dialogRef.close();
  }

  guardar(){
    if(this.validar()){
      this.peli.genres = this.generos.split(',').map((gene:any) => gene.trim());
      this.dialogRef.close(this.peli);
    }
  }

  validar():boolean{
    this.errorTitulo=false;
    this.errorFecha=false;
    this.errorTipo=false;
    this.errorGeneros=false;
    this.errorDescripcion=false;
    this.errorUrl=false;
    let estado = true;

    if (this.peli.original_title.trim() === '') {
      this.errorTitulo = true;
      estado = false;
    }
    if (this.peli.contentType.trim() === '') {
      this.errorTipo = true;
      estado = false;
    }
    if (this.peli.release_date.trim() === '') {
      this.errorFecha = true;
      estado = false;
    }
    if (this.generos.trim() === '') {
      this.errorGeneros = true;
      estado = false;
    }
    if (this.peli.overview.trim() === '') {
      this.errorDescripcion = true;
      estado = false;
    }
    if (this.peli.backdrop_path.trim() === '') {
      this.errorUrl = true;
      estado = false;
    }
    return estado;
  }
}
