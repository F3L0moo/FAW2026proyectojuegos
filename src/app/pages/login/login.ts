import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [
  FormsModule,
  RouterModule
],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = ''; 
  password = '';

  constructor(
    private auth:AuthService,
    private router:Router
  ){}

async login(){

  const success = await this.auth.login(

    this.email,
    this.password

  );

  if(success){

    this.router.navigate(['/memoria']);

  }else{

    alert('Credenciales incorrectas');
  }

}
}