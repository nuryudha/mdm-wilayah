import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteKecamatanComponent } from './delete-kecamatan.component';

describe('DeleteKecamatanComponent', () => {
  let component: DeleteKecamatanComponent;
  let fixture: ComponentFixture<DeleteKecamatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteKecamatanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteKecamatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
