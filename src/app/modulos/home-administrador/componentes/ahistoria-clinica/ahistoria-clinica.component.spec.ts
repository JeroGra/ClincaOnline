import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhistoriaClinicaComponent } from './ahistoria-clinica.component';

describe('AhistoriaClinicaComponent', () => {
  let component: AhistoriaClinicaComponent;
  let fixture: ComponentFixture<AhistoriaClinicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AhistoriaClinicaComponent]
    });
    fixture = TestBed.createComponent(AhistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
