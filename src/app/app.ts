import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

// Standalone components
import { Characterlist } from './characterlist/characterlist';
import { Characterdetails } from './characterdetails/characterdetails';

// Angular Material modules (if you want to use Material in App component)
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,       // Needed for ngIf, ngFor, etc.
    RouterOutlet,       // Router outlet for lazy loading / navigation
    RouterModule,       // Required for routerLink, navigation
    MatToolbarModule,   // Optional if you use a toolbar
    MatIconModule,      // Optional if you use Material icons
    Characterlist,      // Import standalone child component
    Characterdetails    // Import standalone child component
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Title signal
  protected readonly title = signal('100898394-lab-test2-comp3133');

  // Example character object (for testing)
  character = {
    name: 'Harry Potter',
    species: 'Human',
    house: 'Gryffindor',
    wizard: true,
    ancestry: 'Half-blood',
    actor: 'Daniel Radcliffe',
    image: 'https://hp-api.onrender.com/images/harry.jpg',
    wand: {
      wood: 'Holly',
      core: 'Phoenix Feather',
      length: 11
    }
  };
}