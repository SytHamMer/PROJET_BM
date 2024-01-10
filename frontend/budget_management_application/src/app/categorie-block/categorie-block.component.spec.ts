import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieBlockComponent } from './categorie-block.component';

describe('CategorieBlockComponent', () => {
  let component: CategorieBlockComponent;
  let fixture: ComponentFixture<CategorieBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorieBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
