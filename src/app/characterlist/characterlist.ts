import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { CharacterService } from '../shared/character-service';
import { Character } from '../models/character';

@Component({
  selector: 'app-characterlist',
  standalone: true, // <-- makes this component standalone
  imports: [
    CommonModule,      // Needed for *ngFor, *ngIf
    FormsModule,       // Needed for [(ngModel)]
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './characterlist.html',
  styleUrls: ['./characterlist.css']
})
export class Characterlist {

  // Inject services
  private service = inject(CharacterService);
  private router = inject(Router);

  characters: Character[] = [];
  selectedHouse: string = "";

  // Load all characters on component init
  ngOnInit() {
    this.loadCharacters();
  }

  // Fetch all characters
  loadCharacters() {
    this.service.getCharacters().subscribe({
      next: (data: Character[]) => {
        this.characters = data;
      },
      error: (err) => console.error('Error fetching characters', err)
    });
  }

  // Filter characters by house
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

  // Navigate to character detail page
  viewDetails(character: Character) {
    this.router.navigate(['/character', character.id]);
  }
}