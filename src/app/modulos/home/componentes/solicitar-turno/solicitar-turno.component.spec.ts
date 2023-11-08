import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarTurnoComponent } from './solicitar-turno.component';

describe('SolicitarTurnoComponent', () => {
  let component: SolicitarTurnoComponent;
  let fixture: ComponentFixture<SolicitarTurnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitarTurnoComponent]
    });
    fixture = TestBed.createComponent(SolicitarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
