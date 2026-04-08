import { Character } from '../models/character';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
  

@Injectable({
  providedIn: 'root',
})
export class CharacterService {

  // Inject HttpClient for API requests
  private readonly httpClient = inject(HttpClient);

  // Base URL for HP-API
  private readonly API_BASE = 'https://hp-api.onrender.com/api';

  /**
   * Get all characters (wizards, witches, magical creatures)
   */
  getCharacters(): Observable<Character[]> {
    return this.httpClient.get<Character[]>(`${this.API_BASE}/characters`);
  }

  /**
   * Get characters filtered by house
   * House names must be lowercase: gryffindor, slytherin, hufflepuff, ravenclaw
   */
  getCharactersByHouse(house: string): Observable<Character[]> {
    if (!house) {
      return this.getCharacters(); // fallback to all characters
    }
    return this.httpClient.get<Character[]>(
      `${this.API_BASE}/characters/house/${house.toLowerCase()}`
    );
  }

  /**
   * Get a single character by ID
   * @param id Character unique ID
   */
  getCharacterById(id: string): Observable<Character> {
    return this.httpClient.get<Character>(`${this.API_BASE}/character/${id}`);
  }
}