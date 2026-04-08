import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { CharacterService } from '../shared/character-service';
import { Character } from '../models/character';

@Component({
  selector: 'app-characterdetails',
  standalone: true,   // <-- makes this component standalone
  imports: [
    CommonModule,      // Needed for *ngIf
    MatCardModule,
    RouterModule      // Needed for mat-card
  ],
  templateUrl: './characterdetails.html',
  styleUrls: ['./characterdetails.css']
})
export class Characterdetails {

  private route = inject(ActivatedRoute);
  private service = inject(CharacterService);

  character: Character | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.service.getCharacterById(id)
        .subscribe({
          next: (data: Character) => {
            this.character = data; // API returns a single Character
          },
          error: (err) => console.error('Error fetching character details', err)
        });
    }
  }
}