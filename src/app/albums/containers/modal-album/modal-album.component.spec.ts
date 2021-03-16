import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlbumComponent } from './modal-album.component';

describe('ModalAlbumComponent', () => {
  let component: ModalAlbumComponent;
  let fixture: ComponentFixture<ModalAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAlbumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
