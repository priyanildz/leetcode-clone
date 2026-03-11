// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class Execution {
//   private userCode: string = '';

//   runStarted$ = new Subject<void>();
//   result$ = new BehaviorSubject<any>(null);

//   saveCode(code: string) {
//     this.userCode = code;
//   }

//   run() {
//     this.runStarted$.next();

//     setTimeout(() => {
//       const mockResult = {
//         status: 'Accepted',
//         runtime: '52 ms',
//         input: '121',
//         output: 'true',
//         expected: 'true'
//       };
//       this.result$.next(mockResult);
//     }, 1000);
//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http'; // Import HttpClient
// import { BehaviorSubject, Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class Execution {
//   private userCode: string = '';
//   private userLanguage: string = 'JavaScript'; // Store language for the API
//   private apiUrl = 'http://localhost:5000'; // CodeRunner API default URL

//   runStarted$ = new Subject<void>();
//   result$ = new BehaviorSubject<any>(null);

//   constructor(private http: HttpClient) {} // Inject HttpClient

//   // Updated to accept language ID
//   saveCode(code: string, langId?: string) {
//     this.userCode = code;
//     if (langId) {
//       const langMap: any = {
//         'python': 'Python',
//         'javascript': 'JavaScript',
//         'java': 'Java',
//         'cpp': 'C++',
//         'c': 'C'
//       };
//       this.userLanguage = langMap[langId] || 'JavaScript';
//     }
//   }

//   run() {
//     this.runStarted$.next();

//     const payload = {
//       code: this.userCode,
//       language: this.userLanguage,
//       input: "" // Optional input field supported by the API
//     };

//     // Make the real API call
//     this.http.post(`${this.apiUrl}/`, payload).subscribe({
//       next: (res: any) => {
//         const finalResult = {
//           status: res.status === 'Completed' ? 'Accepted' : 'Runtime Error',
//           runtime: 'N/A',
//           input: payload.input || 'None',
//           output: res.output, // The actual output from the compiler
//           expected: 'N/A'
//         };
//         this.result$.next(finalResult);
//       },
//       error: (err) => {
//         this.result$.next({
//           status: 'Server Error',
//           output: 'Could not connect to CodeRunner API. Is it running on port 5000?'
//         });
//       }
//     });
//   }
// }




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Execution {
  private userCode: string = '';
  private userLanguage: string = 'Python';
  private apiUrl = 'http://127.0.0.1:5000';
  private secretKey = 'drdz';

  runTriggered$ = new Subject<void>();
  private resultSource = new BehaviorSubject<any>(null);
  result$ = this.resultSource.asObservable();

  constructor(private http: HttpClient) {}

  saveCode(code: string, langId?: string) {
    this.userCode = code;
    if (langId) {
      const langMap: any = {
        python: 'Python', javascript: 'JavaScript', java: 'Java', cpp: 'C++', c: 'C',
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
      // next: (res: any) => {
      //   const allResults = res.outputs;
      //   const allOutputStrings = allResults.map((r: any) => r.output.toString().trim());
      //   const expectedStrings = expectedOutputs.map((e) => e.toString().trim());

      //   const allMatch = allOutputStrings.every(
      //     (val: string, i: number) => val === expectedStrings[i],
      //   );

      //   // Push the formatted result to all subscribers
      //   this.resultSource.next({
      //     status: allMatch ? 'Accepted' : 'Wrong Answer',
      //     runtime: `${allResults[0].runtime} ms`,
      //     allOutputs: allOutputStrings,
      //     allRuntimes: allResults.map((r: any) => r.runtime),
      //     inputs: testInputs,
      //     expecteds: expectedStrings,
      //   });
      // }
      // execution.ts - REMOVE 'this.cdr.detectChanges();'
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