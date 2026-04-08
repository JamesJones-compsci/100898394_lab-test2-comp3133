import { Component, inject } from '@angular/core';
import { CharacterService } from '../shared/character-service';
import { Router } from '@angular/router';
import { Character } from '../models/character';

@Component({
  selector: 'app-characterlist',
  templateUrl: './characterlist.html',
  styleUrls: ['./characterlist.css'],  // correct array format
})
export class Characterlist {

  private service = inject(CharacterService);
  private router = inject(Router);

  characters: Character[] = [];
  selectedHouse: string = "";

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.service.getCharacters().subscribe({
      next: (data: Character[]) => {
        this.characters = data;
      },
      error: (err) => console.error('Error fetching characters', err)
    });
  }

  filterByHouse() {
    if (!this.selectedHouse) {
      this.loadCharacters();
    } else {
      this.service.getCharactersByHouse(this.selectedHouse)
        .subscribe({
          next: (data: Character[]) => this.characters = data,
          error: (err) => console.error('Error filtering by house', err)
        });
    }
  }

  viewDetails(character: Character) {
    this.router.navigate(['/character', character.id]);
  }
}