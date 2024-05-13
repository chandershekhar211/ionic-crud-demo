import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private storage: StorageService) { }

  async users() {
    return await this.storage.get('users') || [];
  }

  async signup(name: string, email: string, password: string, gender: string, dateOfBirth: Date) {
    return this.users().then(res => {
      const checkDuplicateEmail = res.find((user: any) => user.email === email)
      if (checkDuplicateEmail) {
        return {
          status: 'DUPLICATE_EMAIL',
          message: 'Email already exits! Please login!'
        }
      } else {
        const newUser = {
          id: Math.random(),
          name: name,
          email: email,
          password: password,
          gender: gender,
          dateOfBirth: dateOfBirth
        };
        
        const updatedUsers = [...res, newUser];
        
        this.storage.set('users', updatedUsers);
        return {
          status: 'SUCCESS',
          message: 'Account created successfully!'
        }
      }
    })
    
    
  }
}
