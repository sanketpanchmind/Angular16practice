import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSearchbarComponent } from './dynamic-searchbar.component';

describe('DynamicSearchbarComponent', () => {
  let component: DynamicSearchbarComponent;
  let fixture: ComponentFixture<DynamicSearchbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicSearchbarComponent]
    });
    fixture = TestBed.createComponent(DynamicSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
