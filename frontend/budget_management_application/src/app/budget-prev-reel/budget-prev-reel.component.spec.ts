import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetPrevReelComponent } from './budget-prev-reel.component';

describe('BudgetPrevReelComponent', () => {
  let component: BudgetPrevReelComponent;
  let fixture: ComponentFixture<BudgetPrevReelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetPrevReelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetPrevReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
