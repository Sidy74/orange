import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGardePharmacyComponent } from './add-garde-pharmacy.component';

describe('AddGardePharmacyComponent', () => {
  let component: AddGardePharmacyComponent;
  let fixture: ComponentFixture<AddGardePharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGardePharmacyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGardePharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
