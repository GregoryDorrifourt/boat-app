import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerStepComponent } from './owner-step.component';

describe('OwnerStepComponent', () => {
  let component: OwnerStepComponent;
  let fixture: ComponentFixture<OwnerStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
