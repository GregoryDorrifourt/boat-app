import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeStepComponent } from './type-step.component';

describe('TypeStepComponent', () => {
  let component: TypeStepComponent;
  let fixture: ComponentFixture<TypeStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
