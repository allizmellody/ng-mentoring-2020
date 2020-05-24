import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseValueAccessorComponent } from './base-value-accessor.directive';

describe('BaseValueAccessorComponent', () => {
  let component: BaseValueAccessorComponent;
  let fixture: ComponentFixture<BaseValueAccessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseValueAccessorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseValueAccessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
