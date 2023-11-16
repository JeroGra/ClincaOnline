import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EhistoriaClinicaComponent } from './ehistoria-clinica.component';

describe('EhistoriaClinicaComponent', () => {
  let component: EhistoriaClinicaComponent;
  let fixture: ComponentFixture<EhistoriaClinicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EhistoriaClinicaComponent]
    });
    fixture = TestBed.createComponent(EhistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
