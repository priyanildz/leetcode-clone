import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Execution {
  private userCode: string = '';
  private userLanguage: string = 'Python';
  // private apiUrl = 'http://127.0.0.1:5000';
    private apiUrl = '';
  private secretKey = 'drdz';

  runTriggered$ = new Subject<void>();
  private resultSource = new BehaviorSubject<any>(null);
  result$ = this.resultSource.asObservable();

  constructor(private http: HttpClient) {}

  saveCode(code: string, langId?: string) {
    this.userCode = code;
    if (langId) {
      const langMap: any = {
        python: 'Python',
        javascript: 'JavaScript',
        java: 'Java',
        cpp: 'C++',
        c: 'C',
      };
      this.userLanguage = langMap[langId] || 'Python';
    }
  }

  processRunRequest(testInputs: string[], expectedOutputs: string[]) {
    this.execute(testInputs, expectedOutputs);
  }

  private execute(testInputs: string[], expectedOutputs: string[]) {
    const payload = {
      code: this.userCode,
      language: this.userLanguage,
      inputs: testInputs,
      key: this.secretKey,
    };

    this.http.post(`${this.apiUrl}/`, payload).subscribe({
      next: (res: any) => {
        const allResults = res.outputs;
        const allOutputStrings = allResults.map((r: any) => r.output.toString().trim());
        const expectedStrings = expectedOutputs.map((e) => e.toString().trim());

        const allMatch = allOutputStrings.every(
          (val: string, i: number) => val === expectedStrings[i],
        );

        this.resultSource.next({
          status: allMatch ? 'Accepted' : 'Wrong Answer',
          runtime: `${allResults[0].runtime} ms`,
          allOutputs: allOutputStrings,
          allRuntimes: allResults.map((r: any) => r.runtime),
          inputs: testInputs,
          expecteds: expectedStrings,
        });
        // DO NOT CALL cdr here.
      },
      error: () => {
        this.resultSource.next({ status: 'Server Error', output: 'Check API terminal.' });
      },
    });
  }
}