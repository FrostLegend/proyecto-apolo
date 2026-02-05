import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosItem } from './registros-item';

describe('RegistrosItem', () => {
  let component: RegistrosItem;
  let fixture: ComponentFixture<RegistrosItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrosItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
