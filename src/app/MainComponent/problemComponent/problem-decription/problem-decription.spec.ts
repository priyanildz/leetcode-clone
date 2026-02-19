import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemDecription } from './problem-decription';

describe('ProblemDecription', () => {
  let component: ProblemDecription;
  let fixture: ComponentFixture<ProblemDecription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemDecription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemDecription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
