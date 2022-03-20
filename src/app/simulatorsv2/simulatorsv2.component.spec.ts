import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Simulatorsv2Component } from './simulatorsv2.component';

describe('Simulatorsv2Component', () => {
  let component: Simulatorsv2Component;
  let fixture: ComponentFixture<Simulatorsv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Simulatorsv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Simulatorsv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
