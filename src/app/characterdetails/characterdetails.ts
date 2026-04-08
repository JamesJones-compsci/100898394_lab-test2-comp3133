import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CharacterService } from '../shared/character-service';
import { Character } from '../models/character';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './characterdetails.html',
  styleUrls: ['./characterdetails.css']
})
export class Characterdetails {
  
  private route = inject(ActivatedRoute);
  private service = inject(CharacterService);

  character: Character | null = null;

  // Loading indicator
  loading = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.fetchCharacter(id);
    }
  }

  fetchCharacter(id: string) {
    this.loading.set(true);

    this.service.getCharacterById(id)
      .subscribe({
        next: (data: Character) => {
          // Fallback image if missing
          if (!data.image) {
            data.image = 'https://via.placeholder.com/250x350?text=No+Image';
          }
          this.character = data;
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error fetching character details', err);
          this.loading.set(false);
        }
      });
  }
}