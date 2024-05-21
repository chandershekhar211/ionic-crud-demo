import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  email!: string;
  password!: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Logging in...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.authService
          .login(this.email, this.password)
          ?.then((res) => {
            if (res.status === 'ERROR') {
              loadingEl.dismiss();
              this.toastCtrl
                .create({
                  message: res.message,
                  color: 'dark',
                  duration: 2000,
                })
                .then((toastEl) => toastEl.present());
            } else {
              loadingEl.dismiss();
              this.router.navigate(['/home']);
              form.reset();
            }
          });
      });
  }
}
