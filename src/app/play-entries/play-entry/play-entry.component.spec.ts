import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayEntryComponent } from './play-entry.component';

describe('PlayEntryComponent', () => {
  let component: PlayEntryComponent;
  let fixture: ComponentFixture<PlayEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
