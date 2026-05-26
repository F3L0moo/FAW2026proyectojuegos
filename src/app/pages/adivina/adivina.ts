import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adivina',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './adivina.html',
  styleUrl: './adivina.css'
})
export class Adivina {

  numeroRandom = 0;

  numeroUsuario:number | null = null;

  mensaje = '';

  intentos = 0;

  score = 100;

  juegoTerminado = false;

  constructor(
    private http:HttpClient
  ){

    this.iniciarJuego();

  }

  iniciarJuego(){

    this.numeroRandom =
    Math.floor(Math.random() * 100) + 1;

    this.numeroUsuario = null;

    this.mensaje = '';

    this.intentos = 0;

    this.score = 100;

    this.juegoTerminado = false;

    console.log(this.numeroRandom);

  }

  adivinar(){

    if(
      this.numeroUsuario == null
      ||
      this.juegoTerminado
    ){
      return;
    }

    this.intentos++;

    this.score -= 10;

    if(this.numeroUsuario < this.numeroRandom){

      this.mensaje =
      'El número es más alto';

    }
    else if(
      this.numeroUsuario > this.numeroRandom
    ){

      this.mensaje =
      'El número es más bajo';

    }
    else{

      this.mensaje =
      '¡Correcto!';

      this.juegoTerminado = true;

      this.guardarScore();

    }

    if(this.score <= 0){

      this.score = 0;

      this.juegoTerminado = true;

      this.mensaje =
      'Perdiste el juego';

    }

  }

  guardarScore(){

    const userString =
    localStorage.getItem('user');

    if(userString){

      const user = JSON.parse(userString);

      const payload = {

        usuario:user.email,
        juego:2,
        puntaje:this.score

      };

      this.http.post(

        'http://localhost:3000/score',
        payload

      ).subscribe();

    }

  }

}