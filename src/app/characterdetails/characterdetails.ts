import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../shared/character-service';
import { Character } from '../models/character';

@Component({
  selector: 'app-characterdetails',
  templateUrl: './characterdetails.html',
  styleUrls: ['./characterdetails.css'],
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