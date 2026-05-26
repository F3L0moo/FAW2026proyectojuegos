import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [

  CommonModule,
  FormsModule,
  RouterModule

],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  nombre = '';
  email = '';
  fechaNacimiento = '';
  password = '';
  confirmPassword = '';

  constructor(

  private router:Router,
  private http:HttpClient

){}

  register(){

    // Validar password

    const regex =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if(!regex.test(this.password)){

      alert(
        'La contraseña debe tener letras y números'
      );

      return;
    }

    // Confirmación

    if(
      this.password != this.confirmPassword
    ){

      alert('Las contraseñas no coinciden');

      return;
    }

      const payload = {

    nombre:this.nombre,
    email:this.email,
    fechaNacimiento:this.fechaNacimiento,
    password:this.password

  };

  this.http.post(

    'http://localhost:3000/register',
    payload

  ).subscribe({

    next:(res:any)=>{

      alert(res.message);

      this.router.navigate(['/']);

    },

    error:(err)=>{

      alert(
        err.error.message
      );

    }

  });

  }

} 