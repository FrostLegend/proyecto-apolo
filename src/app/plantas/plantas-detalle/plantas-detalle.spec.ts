import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantasDetalle } from './plantas-detalle';

describe('PlantasDetalle', () => {
  let component: PlantasDetalle;
  let fixture: ComponentFixture<PlantasDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantasDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantasDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
