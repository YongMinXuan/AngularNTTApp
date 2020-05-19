import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitReportsComponent } from './submit-reports.component';

describe('SubmitReportsComponent', () => {
  let component: SubmitReportsComponent;
  let fixture: ComponentFixture<SubmitReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
