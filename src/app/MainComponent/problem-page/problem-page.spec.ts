import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemPage } from './problem-page';

describe('ProblemPage', () => {
  let component: ProblemPage;
  let fixture: ComponentFixture<ProblemPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
