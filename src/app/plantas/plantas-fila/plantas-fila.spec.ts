import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantasFila } from './plantas-fila';

describe('PlantasFila', () => {
  let component: PlantasFila;
  let fixture: ComponentFixture<PlantasFila>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantasFila]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantasFila);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
