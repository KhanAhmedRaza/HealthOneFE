import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugResultComponent } from './drug-result.component';

describe('DrugResultComponent', () => {
  let component: DrugResultComponent;
  let fixture: ComponentFixture<DrugResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrugResultComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
