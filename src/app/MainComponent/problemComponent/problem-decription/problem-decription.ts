import { Component } from '@angular/core';

@Component({
  selector: 'app-problem-decription',
  imports: [],
  templateUrl: './problem-decription.html',
  styleUrl: './problem-decription.css',
})
export class ProblemDecription {
  isTopicsOpen = false;
  isHintsOpen = false;

  toggleSection(section: string) {
    if (section === 'topics') {
      this.isTopicsOpen = !this.isTopicsOpen;
    } else if (section === 'hints') {
      this.isHintsOpen = !this.isHintsOpen;
    }
  }

  scrollToSection(sectionId: string) {
    if (sectionId === 'topics') this.isTopicsOpen = true;
    if (sectionId === 'hints') this.isHintsOpen = true;

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50); 
  }
}