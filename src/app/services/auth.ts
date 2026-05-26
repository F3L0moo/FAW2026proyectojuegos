import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
  private http:HttpClient
) { }

  async login(
  email:string,
  password:string
){

  try{

    const response:any =
    await firstValueFrom(

      this.http.post(

        'http://localhost:3000/login',

        {
          email,
          password
        }

      )

    );

    if(typeof window !== 'undefined'){

      localStorage.setItem(

        'user',

        JSON.stringify(response.user)

      );

    }

    return true;

  }catch(err){

    return false;
  }

}

  logout(){

    if(typeof window !== 'undefined'){

      localStorage.removeItem('user');
    }
  }

  isAuthenticated(){

    if(typeof window === 'undefined'){

      return false;
    }

    return !!localStorage.getItem('user');
  }

  getUser(){

    if(typeof window === 'undefined'){

      return null;
    }

    return localStorage.getItem('user');
  }

}