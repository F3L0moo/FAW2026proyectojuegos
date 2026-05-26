import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-toolbar',
  imports: [RouterModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {

  constructor(
    private auth:AuthService,
    private router:Router
  ){}

  logout(){

    this.auth.logout();

    this.router.navigate(['/']);
  }

}