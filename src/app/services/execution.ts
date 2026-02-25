import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Execution {
  private userCode: string = '';
  
  runStarted$ = new Subject<void>(); 
  result$ = new BehaviorSubject<any>(null);

  saveCode(code: string) {
    this.userCode = code;
  }

  run() {
    this.runStarted$.next(); 
    
    setTimeout(() => {
      const mockResult = {
        status: 'Accepted',
        runtime: '52 ms',
        input: '121',
        output: 'true',
        expected: 'true'
      };
      this.result$.next(mockResult);
    }, 1000);
  }
}