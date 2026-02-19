import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { ProblemPage } from './MainComponent/problem-page/problem-page'

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  imports: [ProblemPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('leetcode-clone');
}
