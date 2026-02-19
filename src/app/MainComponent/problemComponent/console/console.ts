import { Component } from '@angular/core';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [],
  templateUrl: './console.html',
  styleUrl: './console.css',
})

export class Console {
  activeTab: 'testcase' | 'result' = 'testcase';
  selectedCaseIndex: number = 0;
  testCases = [
    {id: 1, input: '121', label: 'x = '},
    {id: 2, input: '-121', label: 'x = '},
    {id: 3, input: '10', label: 'x = '},
  ];
  selectCase(index: number) {
    console.log('Button clicked! New index:', index); 
    this.selectedCaseIndex = index;
  }
}