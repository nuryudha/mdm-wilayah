import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteKabupatenComponent } from './delete-kabupaten.component';

describe('DeleteKabupatenComponent', () => {
  let component: DeleteKabupatenComponent;
  let fixture: ComponentFixture<DeleteKabupatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteKabupatenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteKabupatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
