import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRealtimeComponent } from './listado-realtime.component';

describe('ListadoRealtimeComponent', () => {
  let component: ListadoRealtimeComponent;
  let fixture: ComponentFixture<ListadoRealtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoRealtimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
