import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Execution } from '../../../services/execution';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './console.html',
  styleUrl: './console.css',
})
export class Console implements OnInit, OnDestroy {
  activeTab: 'testcase' | 'result' = 'testcase';
  selectedCaseIndex: number = 0;
  testResult: any = undefined;
  private subs = new Subscription();

  testCases = [
    { id: 1, input: '121', label: 'x = ', expected: 'True' },
    { id: 2, input: '-121', label: 'x = ', expected: 'False' },
    { id: 3, input: '10', label: 'x = ', expected: 'False' },
  ];

  constructor(
    private executionService: Execution,
    private cdr: ChangeDetectorRef, // Injected here correctly
  ) {}

  ngOnInit() {
    // Trigger the run process when NavBar clicks Run
    this.subs.add(
      this.executionService.runTriggered$.subscribe(() => {
        this.activeTab = 'result';
        this.testResult = null; // Forces "Running..." state

        const inputs = this.testCases.map((c) => c.input);
        const expected = this.testCases.map((c) => c.expected);
        this.executionService.processRunRequest(inputs, expected);

        this.cdr.detectChanges();
      }),
    );

    // Listen for the result from the Python API
    this.subs.add(
      this.executionService.result$.subscribe((res) => {
        if (res) {
          this.testResult = res; // Data replaces "Running..."
          this.cdr.detectChanges(); // CRITICAL: Force UI update
        }
      }),
    );
  }

  selectCase(index: number) {
    this.selectedCaseIndex = index;
    // Update local runtime if allRuntimes exist
    if (this.testResult && this.testResult.allRuntimes) {
      this.testResult.runtime = `${this.testResult.allRuntimes[index]} ms`;
    }
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
