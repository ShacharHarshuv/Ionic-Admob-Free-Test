import { Component } from '@angular/core';

import {
  Platform,
  ToastController
} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private adMob: AdMobFree,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toasterController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.adMob.banner.config({
        autoShow: true,
        isTesting: true
      });
      this.adMob.banner.prepare()
        .then(() => {
          // banner Ad is ready
          // if we set autoShow to false, then we will need to call the show method here
        })
        .catch(async (e) => {
          const toaster = await this.toasterController.create({
            message: e,
            color: 'danger'
          });
          toaster.present();
        });
    });
  }
}
