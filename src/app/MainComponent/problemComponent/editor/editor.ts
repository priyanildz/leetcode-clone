import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

declare const monaco: any;

@Component({
  selector: 'app-editor',
  standalone: true,
  templateUrl: './editor.html',
  styleUrl: './editor.css'
})
export class Editor implements AfterViewInit {
  @ViewChild('editorContainer') editorContainer!: ElementRef;
  editor: any;
  selectedLanguage = 'javascript'; 

  ngAfterViewInit() {
    this.checkAndInit();
  }

  checkAndInit() {
    const _window = window as any;
    if (_window.require && _window.monaco) {
      _window.require(['vs/editor/editor.main'], () => {
        this.createEditor();
      });
    } else {
      setTimeout(() => this.checkAndInit(), 100);
    }
  }

  createEditor() {
    if (!this.editor) {
      this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
        value: '// Start coding here...',
        language: this.selectedLanguage,
        theme: 'vs-dark',
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false }
      });
    }
  }

  onLanguageChange(event: any) {
    this.selectedLanguage = event.target.value;
    
    if (this.editor) {
      const model = this.editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, this.selectedLanguage);
      }
    }
  }
}