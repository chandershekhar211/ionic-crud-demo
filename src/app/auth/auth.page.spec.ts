import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthPage } from './auth.page';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage-angular';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;
  let service: AuthService;
  let storage: Storage;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AuthPage],
      imports: [FormsModule],
      providers: [AuthService, Storage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    storage = TestBed.inject(Storage);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when email and password are not empty', () => {
    const form =
      fixture.debugElement.children[1].children[1].children[0].injector.get(
        NgForm
      );
    component.email = 'test@example.com';
    component.password = 'testPassword';
    fixture.detectChanges();
    expect(form.valid).toBeTrue();
  });
});
