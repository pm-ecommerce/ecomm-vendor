import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttrOptionComponent } from './attr-option.component';

describe('AttrOptionComponent', () => {
  let component: AttrOptionComponent;
  let fixture: ComponentFixture<AttrOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttrOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttrOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
