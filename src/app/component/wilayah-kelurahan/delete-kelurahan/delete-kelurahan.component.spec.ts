import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteKelurahanComponent } from './delete-kelurahan.component';

describe('DeleteKelurahanComponent', () => {
  let component: DeleteKelurahanComponent;
  let fixture: ComponentFixture<DeleteKelurahanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteKelurahanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteKelurahanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
