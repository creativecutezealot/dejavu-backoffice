import { TestBed } from '@angular/core/testing';

import { PlayEntriesService } from './play-entries.service';

describe('PlayEntriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayEntriesService = TestBed.get(PlayEntriesService);
    expect(service).toBeTruthy();
  });
});
