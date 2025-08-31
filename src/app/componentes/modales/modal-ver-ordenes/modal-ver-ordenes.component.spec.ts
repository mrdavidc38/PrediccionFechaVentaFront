import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerOrdenesComponent } from './modal-ver-ordenes.component';

describe('ModalVerOrdenesComponent', () => {
  let component: ModalVerOrdenesComponent;
  let fixture: ComponentFixture<ModalVerOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVerOrdenesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalVerOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
