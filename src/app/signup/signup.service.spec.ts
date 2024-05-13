import { TestBed } from '@angular/core/testing';
import { SignupService } from './signup.service';
import { Storage } from '@ionic/storage-angular';

describe('SignupService', () => {
  let service: SignupService;
  let storage: Storage;
  const user = {
    name: 'test',
    email: 'test@gmail.com',
    password: 'testpassword',
    gender: 'female',
    dateOfBirth: new Date('05-09-2024 12:00'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupService, Storage],
    });
    service = TestBed.inject(SignupService);
    storage = TestBed.inject(Storage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(storage).toBeTruthy();
  });

  it('should sign up successfully', async () => {
    const result = await service.signup(
      user.name,
      user.email,
      user.password,
      user.gender,
      user.dateOfBirth
    );
    expect(result).toBeTruthy();
    expect(result.message).toEqual('Account created successfully!');
  });

  it('should not sign up if email is already exit', async () => {
    await storage.set('users', [
      {
        id: 1,
        ...user
      },
    ]);
    const result = await service.signup(
      user.name,
      user.email,
      user.password,
      user.gender,
      user.dateOfBirth
    );
    expect(result).toBeTruthy();
    expect(result.message).toEqual('Email already exits! Please login!');
  });

  it('should get users', async () => {
    await storage.set('users', [
      {
        id: 1,
        ...user
      },
    ]);
    const result = await service.users();
    expect(result).toBeTruthy();
    expect(result.length).toEqual(1)
  });
});
