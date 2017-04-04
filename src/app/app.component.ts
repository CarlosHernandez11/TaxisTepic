import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { NativeStorage } from 'ionic-native';
import { UserPage } from '../pages/user/user';
import { Nav } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild(Nav) nav:Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let env = this;
      NativeStorage.getItem('user')
      .then(function(data){
        env.nav.setRoot(UserPage);
        env.nav.push(UserPage,data);
      },function(error){
        env.nav.setRoot(HomePage);
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
