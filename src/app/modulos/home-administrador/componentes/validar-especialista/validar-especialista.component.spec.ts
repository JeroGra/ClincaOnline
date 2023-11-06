import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarEspecialistaComponent } from './validar-especialista.component';

describe('ValidarEspecialistaComponent', () => {
  let component: ValidarEspecialistaComponent;
  let fixture: ComponentFixture<ValidarEspecialistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidarEspecialistaComponent]
    });
    fixture = TestBed.createComponent(ValidarEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
