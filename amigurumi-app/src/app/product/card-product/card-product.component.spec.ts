import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductComponent } from './card-product.component';

describe('CardProductComponent', () => {
  let component: CardProductComponent;
  let fixture: ComponentFixture<CardProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardProductComponent]
    });
    fixture = TestBed.createComponent(CardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
