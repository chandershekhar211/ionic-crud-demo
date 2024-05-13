import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage-angular';
import { Preferences } from '@capacitor/preferences';
import { User } from './auth.model';

describe('AuthService', () => {
  let service: AuthService;
  let storage: Storage;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [AuthService, Storage],
    });
  });

  beforeEach(async () => {
    service = TestBed.inject(AuthService);
    storage = TestBed.inject(Storage);
    await storage.set('users', [
      {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: 'testpassword',
        gender: 'female',
        dateOfBirth: new Date(),
      },
    ]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', async () => {
    const email = 'test@gmail.com';
    const password = 'testpassword';

    const result = await service.login(email, password);
    expect(result).toBeTruthy();
    
    expect(
      JSON.parse((await Preferences.get({ key: 'authData' })).value as string)
    ).toEqual({ userId: result.response.id, email });
  });

  it('should fail to login with incorrect credentials', async () => {
    const email = 'test@gmail.com';
    const password = 'wrongpassword';

    const result = await service.login(email, password);
    expect(result).toBeTruthy();
    expect(result.status).toEqual('ERROR');
  });

  it('should logout successfully', async () => {
    const email = 'test@gmail.com';
    const password = 'testpassword';

    await service.login(email, password);
    const result = await service.logout();
    expect(result).toBeTruthy();
    expect(result.status).toEqual('SUCCESS'); 
  });

  it('should check if user is authenticated', async () => {
    const email = 'test@gmail.com';
    const password = 'testpassword';

    await service.login(email, password);
    const result = await service.userIsAuthenticated();
    expect(result).toBeTruthy();
    await service.logout();
    const result2 = await service.userIsAuthenticated();
    expect(result2).toBeFalsy();
  })
});
