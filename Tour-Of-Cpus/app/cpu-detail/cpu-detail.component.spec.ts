import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuDetailComponent } from './cpu-detail.component';

describe('CpuDetailComponent', () => {
  let component: CpuDetailComponent;
  let fixture: ComponentFixture<CpuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
