import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProvinsiComponent } from './delete-provinsi.component';

describe('DeleteProvinsiComponent', () => {
  let component: DeleteProvinsiComponent;
  let fixture: ComponentFixture<DeleteProvinsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProvinsiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProvinsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
