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
    { id: 'python', name: 'Python' },
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

  private boilerplates: { [key: string]: string } = {
    python: 'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your code here\n        pass',
    javascript: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Write your code here\n};',
    java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}',
    cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n    }\n};',
    c: 'int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Write your code here\n}',
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

      this.executionService.saveCode(this.boilerplates[this.selectedLanguage]);

      this.editor.onDidChangeModelContent(() => {
        this.executionService.saveCode(this.editor.getValue());
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
        this.executionService.saveCode(newCode);
      }
    }
  }
}