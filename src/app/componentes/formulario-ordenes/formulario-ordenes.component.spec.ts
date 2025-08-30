import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioOrdenesComponent } from './formulario-ordenes.component';

describe('FormularioOrdenesComponent', () => {
  let component: FormularioOrdenesComponent;
  let fixture: ComponentFixture<FormularioOrdenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioOrdenesComponent]
    });
    fixture = TestBed.createComponent(FormularioOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
