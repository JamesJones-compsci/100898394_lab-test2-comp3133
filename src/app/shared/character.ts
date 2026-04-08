import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Character {

  // create instance of HttpClient module and inject it into the application 
  private readonly httpClient = inject(HttpClient);

  private API_BASE_URL = "https://hp-api.onrender.com/"

  getCharacters() : Observable<any>{
    return this.httpClient.get<any[]>(`${this.API}/characters`);
  }

  getCharactersByHouse(house: string) {
    return this.httpClient.get<any[]>(`${this.API}/characters/house/${house}`);
  }

  getCharacterById(id: string) {
    return this.httpClient.get<any>(`${this.API}/character/${id}`);
  } 

}

