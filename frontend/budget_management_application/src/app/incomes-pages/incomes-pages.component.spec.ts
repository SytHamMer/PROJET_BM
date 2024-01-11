import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesPagesComponent } from './incomes-pages.component';

describe('IncomesPagesComponent', () => {
  let component: IncomesPagesComponent;
  let fixture: ComponentFixture<IncomesPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomesPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomesPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
