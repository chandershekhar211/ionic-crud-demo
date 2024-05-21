import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthPage } from './auth.page';
import { AuthService } from '../services/auth/auth.service';
import { Storage } from '@ionic/storage-angular';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoadingController, ToastController } from '@ionic/angular';

const authServiceMock = {
  login: () => Promise.resolve({ status: 'SUCCESS', message: 'Login successful' })
};

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;
  let service: AuthService;
  let storage: Storage;
  let loadingCtrl: LoadingController;
  let toastCtrl: ToastController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AuthPage],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        ToastController,
        LoadingController,
        Storage
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    storage = TestBed.inject(Storage);
    loadingCtrl = TestBed.inject(LoadingController);
    toastCtrl = TestBed.inject(ToastController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading on submit', () => {
    const loadingSpy = spyOn(loadingCtrl, 'create').and.callThrough();

    const form =
      fixture.debugElement.query(By.css('[data-testid="login-form"]')).injector.get(
        NgForm
      );

    component.email = 'test@example.com';
    component.password = 'test';
    component.onSubmit(form);

    expect(loadingSpy).toHaveBeenCalled();
  });

  it('should have a valid form when email and password are not empty', () => {
    const form =
      fixture.debugElement.query(By.css('[data-testid="login-form"]')).injector.get(
        NgForm
      );
    component.email = 'test@example.com';
    component.password = 'testPassword';
    fixture.detectChanges();
    expect(form.valid).toBeTrue();
  });

  it('should have a submit the form', () => {
    const form =
    fixture.debugElement.query(By.css('[data-testid="login-form"]')).injector.get(
      NgForm
    );
    component.email = 'test@example.com';
    component.password = 'testPassword';
    fixture.detectChanges();
    component.onSubmit(form);
    expect(form.valid).toBeTrue();
  });
});
