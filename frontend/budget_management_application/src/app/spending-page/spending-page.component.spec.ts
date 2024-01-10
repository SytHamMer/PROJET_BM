import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingPageComponent } from './spending-page.component';

describe('SpendingPageComponent', () => {
  let component: SpendingPageComponent;
  let fixture: ComponentFixture<SpendingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpendingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpendingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
