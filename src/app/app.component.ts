import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {}

  onLogout() {
    this.loadingCtrl
      .create({
        message: 'Logging out...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.authService.logout().then((res) => {
          loadingEl.dismiss();
          if (res.status === 'SUCCESS') {
            this.router.navigate(['/auth']);
          }
        }).catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
}
