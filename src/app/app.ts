import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html', // correct
  styleUrls: ['./app.css']   // <-- plural, Angular expects this
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