import { Component, OnInit } from '@angular/core';
import { Execution } from '../../../services/execution';

@Component({
  selector: 'app-console',
  standalone: true,
  templateUrl: './console.html',
  styleUrl: './console.css',
})
export class Console implements OnInit {
  activeTab: 'testcase' | 'result' = 'testcase';
  selectedCaseIndex: number = 0;
  testResult: any = null;

  testCases = [
    {id: 1, input: '121', label: 'x = '},
    {id: 2, input: '-121', label: 'x = '},
    {id: 3, input: '10', label: 'x = '},
  ];

  constructor(private executionService: Execution) {}

  ngOnInit() {
    // Switch to Result tab when Run is clicked
    this.executionService.runStarted$.subscribe(() => {
      this.activeTab = 'result';
      this.testResult = null; // Clear old result
    });

    // Capture the actual result
    this.executionService.result$.subscribe(res => {
      this.testResult = res;
    });
  }

  selectCase(index: number) {
    this.selectedCaseIndex = index;
  }
}