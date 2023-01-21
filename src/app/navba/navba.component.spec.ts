import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbaComponent } from './navba.component';

describe('NavbaComponent', () => {
  let component: NavbaComponent;
  let fixture: ComponentFixture<NavbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
