import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveStatusComponent } from './executive-status.component';

describe('ExecutiveStatusComponent', () => {
  let component: ExecutiveStatusComponent;
  let fixture: ComponentFixture<ExecutiveStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutiveStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutiveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
