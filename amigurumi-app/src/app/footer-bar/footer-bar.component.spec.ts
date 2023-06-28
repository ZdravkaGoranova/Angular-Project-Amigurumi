import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBarComponent } from './footer-bar.component';

describe('FooterBarComponent', () => {
  let component: FooterBarComponent;
  let fixture: ComponentFixture<FooterBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterBarComponent]
    });
    fixture = TestBed.createComponent(FooterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
