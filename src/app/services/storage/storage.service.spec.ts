import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage-angular';

describe('StorageService', () => {
  let service: StorageService;
  let storage: Storage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: StorageService, useValue: jasmine.createSpyObj('StorageService', ['init', 'set', 'get', 'remove', 'clear']) },
        { provide: Storage, useValue: jasmine.createSpyObj('Storage', ['create']) }
      ]
    })
   .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(StorageService);
    storage = TestBed.inject(Storage);
    service.init();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set a value in storage', () => {
    service.set('testKey', 'testValue');
    expect(service.set).toHaveBeenCalledWith('testKey', 'testValue');
  });

  it('should get a value from storage', async () => {
    const getSpy = (service.get as jasmine.Spy).and.returnValue(
      Promise.resolve('testValue')
    );
    const value = await service.get('testKey');
    expect(getSpy).toHaveBeenCalledWith('testKey');
    expect(value).toEqual('testValue');
  });

  it('should remove a value from storage', () => {
    service.remove('testKey');
    expect(service.remove).toHaveBeenCalledWith('testKey');
  });

  it('should clear all values from storage', () => {
    service.clear();
    expect(service.clear).toHaveBeenCalled();
  });

  // it('should create the storage object', () => {
  //   const createSpy = (storage.create as jasmine.Spy).and.returnValue(
  //     Promise.resolve({
  //       set: () => {},
  //       get: () => {},
  //       remove: () => {},
  //       clear: () => {},
  //     })
  //   );
  //   service.init();
  //   expect(createSpy).toHaveBeenCalled();
  // });
});
