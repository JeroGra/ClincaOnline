import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhistoriaClinicaComponent } from './phistoria-clinica.component';

describe('PhistoriaClinicaComponent', () => {
  let component: PhistoriaClinicaComponent;
  let fixture: ComponentFixture<PhistoriaClinicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhistoriaClinicaComponent]
    });
    fixture = TestBed.createComponent(PhistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
