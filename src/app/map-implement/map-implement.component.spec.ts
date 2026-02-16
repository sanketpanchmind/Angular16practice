import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapImplementComponent } from './map-implement.component';

describe('MapImplementComponent', () => {
  let component: MapImplementComponent;
  let fixture: ComponentFixture<MapImplementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapImplementComponent]
    });
    fixture = TestBed.createComponent(MapImplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
