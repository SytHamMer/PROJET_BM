import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitesPageComponent } from './activity-page.component';

describe('ActivitesPageComponent', () => {
  let component: ActivitesPageComponent;
  let fixture: ComponentFixture<ActivitesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
