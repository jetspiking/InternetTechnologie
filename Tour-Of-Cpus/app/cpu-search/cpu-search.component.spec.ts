import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuSearchComponent } from './cpu-search.component';

describe('CpuSearchComponent', () => {
  let component: CpuSearchComponent;
  let fixture: ComponentFixture<CpuSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
