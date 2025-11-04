import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderTranslationComponent } from './render-translation.component';

describe('RenderTranslationComponent', () => {
  let component: RenderTranslationComponent;
  let fixture: ComponentFixture<RenderTranslationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenderTranslationComponent]
    });
    fixture = TestBed.createComponent(RenderTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
