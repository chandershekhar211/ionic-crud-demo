import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private signupService: SignupService,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(8)],
      }),
      confirmPassword: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(8)],
      }),
      gender: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      dateOfBirth: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  onSignUp() {
    if (
      !this.form.valid ||
      this.form.value.password !== this.form.value.confirmPassword
    ) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Creating account...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        const name = this.form.value.name;
        const email = this.form.value.email;
        const password = this.form.value.password;
        const gender = this.form.value.gender;
        const dateOfBirth = new Date(this.form.value.dateOfBirth);
        this.signupService
          .signup(name, email, password, gender, dateOfBirth)
          .then((res: {status: string, message: string}) => {
            setTimeout(() => {
              if (res.status === 'SUCCESS') {
                loadingEl.dismiss();
                this.form.reset();
                this.router.navigate(['/auth']);
              } else if (res.status === 'DUPLICATE_EMAIL') {
                loadingEl.dismiss();
                this.toast.create({
                  message: res.message,
                  duration: 2000,
                  color: 'dark'
                }).then(toastEl => toastEl.present()) 
              }
            }, 2000);
          });
      });
  }
}
