import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CharacterService } from '../shared/character-service';
import { Character } from '../models/character';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './characterlist.html',
  styleUrls: ['./characterlist.css']
})
export class Characterlist {
  private service = inject(CharacterService);
  private router = inject(Router);

  characters: Character[] = [];
  selectedHouse: string = "";
  loading = signal(false); // For optional loading spinner

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading.set(true);
    this.service.getCharacters().subscribe({
      next: (data: Character[]) => {
        this.characters = data.map(c => this.normalizeCharacter(c));
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching characters', err);
        this.loading.set(false);
      }
    });
  }

  filterByHouse() {
    this.loading.set(true);
    if (!this.selectedHouse) {
      this.loadCharacters();
    } else {
      this.service.getCharactersByHouse(this.selectedHouse).subscribe({
        next: (data: Character[]) => {
          this.characters = data.map(c => this.normalizeCharacter(c));
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error filtering by house', err);
          this.loading.set(false);
        }
      });
    }
  }

  viewDetails(character: Character) {
    this.router.navigate(['/character', character.id]);
  }

  // Normalize data for display
  normalizeCharacter(char: Character): Character {
    return {
      ...char,
      house: char.house ? char.house[0].toUpperCase() + char.house.slice(1).toLowerCase() : 'Unknown House',
      image: char.image || 'assets/fallback-character.png' // fallback image
    };
  }
}