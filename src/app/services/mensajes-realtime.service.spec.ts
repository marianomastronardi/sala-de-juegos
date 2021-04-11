import { TestBed } from '@angular/core/testing';

import { MensajesRealtimeService } from './mensajes-realtime.service';

describe('MensajesRealtimeService', () => {
  let service: MensajesRealtimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesRealtimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
