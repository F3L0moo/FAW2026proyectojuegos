import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scores',
  imports: [CommonModule],
  templateUrl: './scores.html',
  styleUrl: './scores.css'
})
export class Scores implements OnInit {

  scores:any[] = [];

  constructor(
    private http:HttpClient
  ){}

  ngOnInit(){

    this.getScores();

  }

  getScores(){

    this.http.get<any[]>(

      'http://localhost:3000/scores'

    ).subscribe({

      next:(data)=>{

        console.log(data);

        this.scores = data;

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

}