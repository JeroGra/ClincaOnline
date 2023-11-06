import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAdminComponent } from './alta-admin.component';

describe('AltaAdminComponent', () => {
  let component: AltaAdminComponent;
  let fixture: ComponentFixture<AltaAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaAdminComponent]
    });
    fixture = TestBed.createComponent(AltaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
