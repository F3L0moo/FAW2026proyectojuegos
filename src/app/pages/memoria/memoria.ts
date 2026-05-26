import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-memoria',
  imports: [CommonModule],
  templateUrl: './memoria.html',
  styleUrl: './memoria.css'
})
export class Memoria implements OnInit {

  constructor(private http:HttpClient) {}

  cards:any[] = [];

  selectedCards:any[] = [];

  score = 0;

  seconds = 0;

  timer:any;

  finished = false;

images = [

  'memoria/1.png',
  'memoria/2.png',
  'memoria/3.png',
  'memoria/4.png',
  'memoria/5.png',
  'memoria/6.png',
  'memoria/7.png',
  'memoria/8.png',
  'memoria/9.png'

];

  ngOnInit(){

    this.startGame();
  }

  startGame(){

    this.finished = false;

    this.score = 0;

    this.seconds = 0;

    this.selectedCards = [];

    const duplicated = [...this.images,...this.images];

    this.cards = duplicated
    .sort(()=>Math.random()-0.5)
    .map(image => ({
      image,
      flipped:false,
      matched:false
    }));

    clearInterval(this.timer);

    this.timer = setInterval(()=>{

      this.seconds++;

      if(this.seconds >= 60){

        this.finishGame();
      }

    },1000);

  }

  flipCard(card:any){

    if(
      card.flipped
      ||
      card.matched
      ||
      this.selectedCards.length >= 2
      ||
      this.finished
    ){
      return;
    }

    card.flipped = true;

    this.selectedCards.push(card);

    if(this.selectedCards.length == 2){

      const first = this.selectedCards[0];
      const second = this.selectedCards[1];

      if(first.image == second.image){

        first.matched = true;
        second.matched = true;

        this.score += 5 * (60 - this.seconds);

        this.selectedCards = [];

        const allMatched = this.cards.every(
          card => card.matched
        );

        if(allMatched){

          this.finishGame();
        }

      }else{

        setTimeout(()=>{

          first.flipped = false;
          second.flipped = false;

          this.selectedCards = [];

        },1000);

      }

    }

  }

  finishGame(){

  this.finished = true;

  clearInterval(this.timer);

  const userString =
  localStorage.getItem('user');

  if(userString){

    const user = JSON.parse(userString);

    const payload = {

      usuario:user.email,
      juego:1,
      puntaje:this.score

    };

    this.http.post(

      'http://localhost:3000/score',
      payload

    ).subscribe();

  }

  alert(
    'Juego terminado. Score: ' + this.score
  );

}

}