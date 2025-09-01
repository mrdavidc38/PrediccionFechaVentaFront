import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevaOrdenComponent } from './modal-nueva-orden.component';

describe('ModalNuevaOrdenComponent', () => {
  let component: ModalNuevaOrdenComponent;
  let fixture: ComponentFixture<ModalNuevaOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNuevaOrdenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNuevaOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
