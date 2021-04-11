import { TestBed } from '@angular/core/testing';

import { MensajesFirestoreService } from './mensajes-firestore.service';

describe('MensajesFirestoreService', () => {
  let service: MensajesFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
