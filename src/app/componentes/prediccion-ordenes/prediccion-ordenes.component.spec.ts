import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrediccionOrdenesComponent } from './prediccion-ordenes.component';

describe('PrediccionOrdenesComponent', () => {
  let component: PrediccionOrdenesComponent;
  let fixture: ComponentFixture<PrediccionOrdenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrediccionOrdenesComponent]
    });
    fixture = TestBed.createComponent(PrediccionOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
