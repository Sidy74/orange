import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacieDeGardeComponent } from './pharmacie-de-garde.component';

describe('PharmacieDeGardeComponent', () => {
  let component: PharmacieDeGardeComponent;
  let fixture: ComponentFixture<PharmacieDeGardeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacieDeGardeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacieDeGardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
