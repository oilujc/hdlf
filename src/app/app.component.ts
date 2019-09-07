import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

import { Book } from './interfaces/book';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  book : Book;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Biografía',
      url: '/section/biografia-del-autor',
      icon: 'person'
    },
    {
      title: 'Dedicatoria',
      url: '/section/dedicatoria',
      icon: 'mail-open'
    }, 
    {
      title: 'Temario',
      url: '/chapters',
      icon: 'list'
    },
    {
      title: 'Marcadores',
      url: '/marks',
      icon: 'bookmark'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    public navCtrl: NavController

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.storage.get('book').then((val) => {

        if (val == null) {
          this.storage.set('book', 1);
        }
      this.splashScreen.hide();
      }).catch(err=> console.log(err));
    });
  }

  changeBook() {
    this.storage.get('book').then((val) => {
      console.log(val);
      if (val == 1) {
        this.storage.set('book', 2);

      } else if (val == 2){
        this.storage.set('book', 1);
      } 
      this.navigate('/home');
    }).catch(err=> console.log(err));
  }

  navigate(url) {
    this.router.navigateByUrl(url);
  }
}
