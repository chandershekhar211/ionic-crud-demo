import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { LoadingController } from '@ionic/angular';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;
  let loadingCtrl: LoadingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['logout']) },
        { provide: LoadingController, useValue: jasmine.createSpyObj('LoadingController', ['create']) }
      ]
    })
  .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    loadingCtrl = TestBed.inject(LoadingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present a loading controller when the onLogout method is called', () => {
    const createLoadingSpy = (loadingCtrl.create as jasmine.Spy).and.returnValue(Promise.resolve({ present: () => {} }));
    component.onLogout();
    expect(createLoadingSpy).toHaveBeenCalled();
  });

  it('should dismiss the loading controller when the logout is successful', () => {
    const createLoadingSpy = (loadingCtrl.create as jasmine.Spy).and.returnValue(Promise.resolve({ present: () => {} }));
    const dismissSpy = (loadingCtrl.create as jasmine.Spy).and.returnValue(Promise.resolve({ dismiss: () => {} }));
    component.onLogout();
    expect(createLoadingSpy).toHaveBeenCalled();
    expect(dismissSpy).toHaveBeenCalled();
  });

});
