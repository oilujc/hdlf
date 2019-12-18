import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

import { Book } from './interfaces/book';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from './services/database.service';
import { BookmarkService } from './services/bookmark.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    book: Book;
    selectedBook: number;
    splash = false;
    bookImgName = 'assets/portada1.jpg';

    appPages = [
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
            title: '¿Cómo fundar los Hospitalitos de la fe?',
            url: '/how-to',
            icon: 'medkit'
        },
        {
            title: 'Marcadores',
            url: '/marks',
            icon: 'bookmark'
        }
    ];

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private storage: Storage,
        private router: Router,
        public navCtrl: NavController,
        private db: DatabaseService,
        private bookmarkService: BookmarkService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.storage.get('book').then((val) => {
                if (val == null) {
                    this.storage.set('book', 1);
                    this.db.setBook(1);
                } else {
                    this.db.setBook(val);
                }
            }).catch(err => console.log(err));

            this.bookmarkService.loadMarks();
        });
    }

    changeBook(e) {
        this.storage.get('book').then((val) => {
            console.log(val)
            if (val === 1) {
                this.bookImgName = 'assets/portada2.jpg';
                this.db.setBook(2);
            } else if (val === 2) {
                this.bookImgName = 'assets/portada1.jpg';
                this.db.setBook(1);
            }
            this.hideSplash();
            this.navigate('/home');
        }).catch(err => console.log(err));
    }

    hideSplash() {
        this.splash = true;
        setTimeout(() => this.splash = false, 2500);
    }

    navigate(url) {
        this.router.navigateByUrl(url);
    }
}
