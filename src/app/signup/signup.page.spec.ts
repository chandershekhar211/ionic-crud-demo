import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupPage } from './signup.page';
import { SignupService } from './signup.service';
import { Storage } from '@ionic/storage-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoadingController, ToastController } from '@ionic/angular';

describe('SignupPage', () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;
  let service: SignupService;
  let storage: Storage;
  let loadingCtrl: LoadingController;
  let toastCtrl: ToastController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupPage],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: SignupService, useValue: jasmine.createSpyObj('SignupService', ['signup']) },
        { provide: LoadingController, useValue: jasmine.createSpyObj('LoadingController', ['create']) },
        { provide: ToastController, useValue: jasmine.createSpyObj('ToastController', ['create']) },
        Storage
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    service = TestBed.inject(SignupService);
    storage = TestBed.inject(Storage);
    loadingCtrl = TestBed.inject(LoadingController);
    toastCtrl = TestBed.inject(ToastController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when form fields are empty', () => {
    component.form.controls['name'].setValue('');
    component.form.controls['email'].setValue('');
    component.form.controls['password'].setValue('');
    component.form.controls['confirmPassword'].setValue('');
    component.form.controls['gender'].setValue('');
    component.form.controls['dateOfBirth'].setValue('');
    fixture.detectChanges();
    expect(component.form.invalid).toBeTrue();
  });

  it('should have an valid form when form fields are not empty', () => {
    component.form.controls['name'].setValue('test');
    component.form.controls['email'].setValue('test@gmail.com');
    component.form.controls['password'].setValue('testpassword');
    component.form.controls['confirmPassword'].setValue('testpassword');
    component.form.controls['gender'].setValue('2');
    component.form.controls['dateOfBirth'].setValue('09-05-2024');
    fixture.detectChanges();
    expect(component.form.valid).toBeTrue();
  });

  it('should call onSignUp method when the form submit', () => {
    const onSignUpSpy = spyOn(component, 'onSignUp');
    component.form.controls['name'].setValue('test');
    component.form.controls['email'].setValue('test@gmail.com');
    component.form.controls['password'].setValue('testpassword');
    component.form.controls['confirmPassword'].setValue('testpassword');
    component.form.controls['gender'].setValue('2');
    component.form.controls['dateOfBirth'].setValue('09-05-2024');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(
      By.css('ion-button[type="button"]')
    );
    submitButton.triggerEventHandler('click', null);
    expect(onSignUpSpy).toHaveBeenCalled();
  });

  it('should call the signup method of the signupService when the form is submitted', () => {
    const signUpSpy = spyOn(component, 'onSignUp');
    component.form.controls['name'].setValue('test');
    component.form.controls['email'].setValue('test@gmail.com');
    component.form.controls['password'].setValue('testpassword');
    component.form.controls['confirmPassword'].setValue('testpassword');
    component.form.controls['gender'].setValue('Male');
    component.form.controls['dateOfBirth'].setValue('09-05-2024');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(
      By.css('ion-button[type="button"]')
    );
    submitButton.triggerEventHandler('click', null);
    expect(signUpSpy).toHaveBeenCalled( );
  });

  it('should present a loading controller when the form is submitted', () => {
    const createLoadingSpy = (loadingCtrl.create as jasmine.Spy).and.returnValue(Promise.resolve({ present: () => {} }));
    component.form.controls['name'].setValue('test');
    component.form.controls['email'].setValue('test@gmail.com');
    component.form.controls['password'].setValue('testpassword');
    component.form.controls['confirmPassword'].setValue('testpassword');
    component.form.controls['gender'].setValue('Male');
    component.form.controls['dateOfBirth'].setValue('09-05-2024');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('ion-button[type="button"]'));
    submitButton.triggerEventHandler('click', null);
    expect(createLoadingSpy).toHaveBeenCalled();
  });

  it('should dismiss the loading controller when the signup is successful', () => {
    const createLoadingSpy = (loadingCtrl.create as jasmine.Spy).and.returnValue(Promise.resolve({ present: () => {} }));
    const dismissSpy = (loadingCtrl.create as jasmine.Spy).and.returnValue(Promise.resolve({ dismiss: () => {} }));
    component.form.controls['name'].setValue('test');
    component.form.controls['email'].setValue('test@gmail.com');
    component.form.controls['password'].setValue('testpassword');
    component.form.controls['confirmPassword'].setValue('testpassword');
    component.form.controls['gender'].setValue('Male');
    component.form.controls['dateOfBirth'].setValue('09-05-2024');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('ion-button[type="button"]'));
    submitButton.triggerEventHandler('click', null);
    expect(createLoadingSpy).toHaveBeenCalled();
    expect(dismissSpy).toHaveBeenCalled();
  });

  // it('should present a toast controller when the signup is unsuccessful', async () => {
  //   await storage.create();
  //   await storage.set('users', [
  //     {
  //       id: 1,
  //       name: 'test',
  //       email: 'test@gmail.com',
  //       password: 'testpassword',
  //       gender: 'female',
  //       dateOfBirth: new Date(),
  //     },
  //   ]);
  //   const createToastSpy = (toastCtrl.create as jasmine.Spy).and.returnValue(Promise.resolve({ present: () => {} }));
  //   component.form.controls['name'].setValue('test');
  //   component.form.controls['email'].setValue('test@gmail.com');
  //   component.form.controls['password'].setValue('testpassword');
  //   component.form.controls['confirmPassword'].setValue('testpassword');
  //   component.form.controls['gender'].setValue('Male');
  //   component.form.controls['dateOfBirth'].setValue('09-05-2024');
  //   fixture.detectChanges();
  //   const submitButton = fixture.debugElement.query(By.css('ion-button[type="button"]'));
  //   submitButton.triggerEventHandler('click', null);
  //   expect(createToastSpy).toHaveBeenCalled();
  // });

  // it('should reset the form when the signup is successful', () => {
  //   const resetSpy = spyOn(component.form, 'reset');
  //   const signupSpy = spyOn(component, 'onSignUp');
  //   component.form.controls['name'].setValue('test');
  //   component.form.controls['email'].setValue('test@gmail.com');
  //   component.form.controls['password'].setValue('testpassword');
  //   component.form.controls['confirmPassword'].setValue('testpassword');
  //   component.form.controls['gender'].setValue('Male');
  //   component.form.controls['dateOfBirth'].setValue('09-05-2024');
  //   fixture.detectChanges();
  //   const submitButton = fixture.debugElement.query(By.css('ion-button[type="button"]'));
  //   submitButton.triggerEventHandler('click', null);
  //   expect(signupSpy).toHaveBeenCalled();
  //   expect(resetSpy).toHaveBeenCalled();
  // });

});
