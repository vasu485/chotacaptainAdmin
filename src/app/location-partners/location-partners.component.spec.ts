import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPartnersComponent } from './location-partners.component';

describe('LocationPartnersComponent', () => {
  let component: LocationPartnersComponent;
  let fixture: ComponentFixture<LocationPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
