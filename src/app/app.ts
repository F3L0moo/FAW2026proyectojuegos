import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Toolbar } from './components/toolbar/toolbar';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Toolbar
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(
    public auth:AuthService
  ){}

}