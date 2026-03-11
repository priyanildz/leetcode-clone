import { Component } from '@angular/core';
import { Execution } from '../../../services/execution';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  constructor(private executionService: Execution) {}

  // nav-bar.ts
  runCode() {
    // This notifies the Console component to start the run
    this.executionService.runTriggered$.next();
  }
}
