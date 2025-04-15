import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaciesDeGardeComponent } from './pharmacies-de-garde.component';

describe('PharmaciesDeGardeComponent', () => {
  let component: PharmaciesDeGardeComponent;
  let fixture: ComponentFixture<PharmaciesDeGardeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmaciesDeGardeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmaciesDeGardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
