import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StatusShadowDirective } from './status-shadow.directive';

@Component({
  template: `
  <h2 [agmpStatusShadow]="'04/25/2020'">Upcoming. With green shadow</h2>
  <h2 [agmpStatusShadow]="'05/07/2020'">New. With blue shadow</h2>
  <h2 [agmpStatusShadow]="'01/07/2020'">Old. Without shadow</h2>
  <h2 [agmpStatusShadow]="'date'">Invalid date value. Without shadow</h2>
  <h2 [agmpStatusShadow]="''">Empty value. Without shadow</h2>
  <h2 [agmpStatusShadow]="null">Null value. Without shadow</h2>
  <h2>Without directive</h2>`
})
class TestComponent {}

describe('StatusBorderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ StatusShadowDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(StatusShadowDirective));
  });

  it('should have three highlighted elements', () => {
    expect(des.length).toBe(6);
  });

  it('should shadow 1st <h2> "155,200,55"', () => {
    const boxShadow = des[0].nativeElement.style.boxShadow;
    expect(boxShadow).toContain('rgba(155, 200, 55, 0.5)');
  });

  it('should shadow 2nd <h2> "48,182,221"', () => {
    const boxShadow = des[1].nativeElement.style.boxShadow;
    expect(boxShadow).toContain('rgba(48, 182, 221, 0.5)');
  });

  it('should not set shadow 3rd <h2>', () => {
    const boxShadow = des[2].nativeElement.style.boxShadow;
    expect(boxShadow).toBe('');
  });

  it('should not set shadow 4th <h2>', () => {
    const boxShadow = des[3].nativeElement.style.boxShadow;
    expect(boxShadow).toBe('');
  });

  it('should not set shadow 5th <h2>', () => {
    const boxShadow = des[4].nativeElement.style.boxShadow;
    expect(boxShadow).toBe('');
  });

  it('bare <h2> should not have a customProperty', () => {
    const lasCard = fixture.debugElement.query(By.css('h2:not([statusShadow])'));

    expect(lasCard.properties.customProperty).toBeUndefined();
  });
});
