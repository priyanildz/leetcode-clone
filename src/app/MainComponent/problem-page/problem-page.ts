import { Component } from '@angular/core';
import { NavBar } from '../problemComponent/nav-bar/nav-bar';
import { ProblemDecription } from '../problemComponent/problem-decription/problem-decription';
import { Editor } from '../problemComponent/editor/editor';
import { Console } from '../problemComponent/console/console';
import { AngularSplitModule } from 'angular-split';

@Component({
  selector: 'app-problem-page',
  standalone: true,
  imports: [NavBar, ProblemDecription, Editor, Console, AngularSplitModule],
  templateUrl: './problem-page.html',
  styleUrl: './problem-page.css',
})
export class ProblemPage {

}
