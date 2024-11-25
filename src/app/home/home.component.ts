import { Component, AfterViewInit, OnInit, ViewChild, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServicioService } from '../service/servicio.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { VerComponent } from '../ver/ver.component';
import { EditarComponent } from '../editar/editar.component';
import { EliminarComponent } from '../eliminar/eliminar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule,MatToolbarModule,MatIconModule,MatCardModule,MatListModule,MatMenuModule,MatButtonModule,
    MatPaginator,MatTableModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit,AfterViewInit {
  constructor(private servicio: ServicioService) {}

  displayedColumns: string[] = ['id','codigo', 'portada', 'nombre', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  usuario:any=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  readonly pelicula = signal('');
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.servicio.getSeries().subscribe((response: any)=> {
      let contador=1;
      this.dataSource.data = response.movies.map((pelicula:any)=>{
        return{
          ...pelicula,
          contador:contador++
        }
      });
     });
    let temporal=this.servicio.getItem('usuario');
    this.usuario=temporal ? JSON.parse(temporal) : [];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openVer(item: any): void {
    const peli = this.dataSource.data.find((pelicula) => pelicula._id === item._id);
    const dialogRef = this.dialog.open(VerComponent, {
      data: {name: 'Información de la filmación', pelicula: peli},
    });
  }

  openEditar(item:any): void {
    const peli = this.dataSource.data.find((pelicula) => pelicula._id === item._id);
    const dialogRef = this.dialog.open(EditarComponent, {
      data: {name: 'Editar serie', pelicula: peli},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const nuevo=this.dataSource.data.findIndex(peli=>peli._id==result._id);
        if(nuevo!=-1){
          this.dataSource.data[nuevo] = result;
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }

  openEliminar(item: any): void {
    const peli = this.dataSource.data.find((pelicula) => pelicula._id === item._id);
    const dialogRef = this.dialog.open(EliminarComponent, {
      data: {name: 'Confirmación', pelicula: peli},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.eliminar(item);
      }
    });
  }

  eliminar(item: any): void {
    const index = this.dataSource.data.findIndex(data => data._id === item._id);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = this.dataSource.data.map((data, i) => {
        if (i >= index) {
          return { ...data, contador: data.contador - 1 };
        }
        return data;
      });
      this.dataSource._updateChangeSubscription();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'avatar_img.png';
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}