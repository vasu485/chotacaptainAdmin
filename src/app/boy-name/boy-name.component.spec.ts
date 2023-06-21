import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoyNameComponent } from './boy-name.component';

describe('BoyNameComponent', () => {
  let component: BoyNameComponent;
  let fixture: ComponentFixture<BoyNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoyNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoyNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
