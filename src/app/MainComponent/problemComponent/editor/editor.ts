import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Execution } from '../../../services/execution';

declare const monaco: any;

@Component({
  selector: 'app-editor',
  standalone: true,
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor implements AfterViewInit {
  @ViewChild('editorContainer') editorContainer!: ElementRef;
  editor: any;
  
  isDropdownOpen = false;
  selectedLanguage = 'javascript';
  selectedLanguageDisplay = 'JavaScript';

  languages = [
    { id: 'c', name: 'C' },
    { id: 'cpp', name: 'C++' },
    { id: 'java', name: 'Java' },
    { id: 'python', name: 'Python 3' },
    { id: 'javascript', name: 'JavaScript' }
  ];

  constructor(private executionService: Execution) {}

  ngAfterViewInit() {
    this.checkAndInit();
  }

  checkAndInit() {
    const _window = window as any;
    if (_window.require && !_window.monaco) {
      _window.require(['vs/editor/editor.main'], () => {
        this.createEditor();
      });
    } else {
      setTimeout(() => this.checkAndInit(), 100);
    }
  }

  // UPDATED: Boilerplates specifically for "Palindrome Number"
  private boilerplates: { [key: string]: string } = {
    python: 'class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        # Write your code here\n        pass',
    javascript: '/**\n * @param {number} x\n * @return {boolean}\n */\nvar isPalindrome = function(x) {\n    // Write your code here\n};',
    java: 'class Solution {\n    public boolean isPalindrome(int x) {\n        // Write your code here\n        return false;\n    }\n}',
    cpp: 'class Solution {\npublic:\n    bool isPalindrome(int x) {\n        // Write your code here\n    }\n};',
    c: 'bool isPalindrome(int x) {\n    // Write your code here\n}',
  };

  createEditor() {
    if (!this.editor) {
      this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
        value: this.boilerplates[this.selectedLanguage],
        language: this.selectedLanguage,
        theme: 'vs-dark',
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false },
      });

      this.executionService.saveCode(this.boilerplates[this.selectedLanguage], this.selectedLanguage);

      this.editor.onDidChangeModelContent(() => {
        this.executionService.saveCode(this.editor.getValue(), this.selectedLanguage);
      });
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLanguage(langId: string, langName: string) {
    this.selectedLanguage = langId;
    this.selectedLanguageDisplay = langName;
    this.isDropdownOpen = false;

    if (this.editor) {
      const model = this.editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, this.selectedLanguage);
        const newCode = this.boilerplates[this.selectedLanguage];
        this.editor.setValue(newCode);
        this.executionService.saveCode(newCode, this.selectedLanguage);
      }
    }
  }
}