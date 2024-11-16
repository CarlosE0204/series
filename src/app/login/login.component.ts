import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { ServicioService } from '../service/servicio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string='';
  passwd: string='';
  errorCorreo:boolean =false;
  errorContra:boolean=false;
  estan:boolean=false;

  usuarios: any[]=[];

  constructor(private servicio:ServicioService,private router:Router){ } 

   ngOnInit():void{
     this.llenarDatos();
   }

  llenarDatos(){
     this.servicio.getUsers().subscribe(data=>{
       this.usuarios=data;
     })
  }

  validar():boolean{
    this.errorCorreo = false;
    this.errorContra = false;
    let estado = true;

    if (this.email.trim() === '') {
      this.errorCorreo = true;
      estado = false;
    }
    if (this.passwd.trim() === '') {
      this.errorContra = true;
      estado = false;
    }
    return estado;
  }
  ingresar(){
    if(this.validar()){
      const usuarioval = this.usuarios.find((user) => user.email === this.email && user.password === this.passwd);
    if(usuarioval){
      this.router.navigate(['/home']);
    }else{
      this.estan=true;
    }
    }
  }
}

  // constructor(private router:Router){}
  // iniciar(){
  //   this.router.navigate(['/home']);
  // }