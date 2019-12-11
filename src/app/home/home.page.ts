import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Book } from '../interfaces/book';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ThemingService } from '../services/theming.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    book: Book;
    selectedBook: boolean;
    bookImgName = 'assets/portada1.jpg';
    imgImprimatur: string;
    splash = false;

    message = 'Hola esta es ap App de Hospitalitos De la Fe, espero que sea utíl para ti';
    subject: string = null;
    file: string = null;
    url = 'https://play.google.com/store/apps/details?id=hospitalitos.de.la.fe';

    constructor(
        private storage: Storage,
        private router: Router,
        private db: DatabaseService,
        private socialSharing: SocialSharing,
        private themeService: ThemingService,
        private actionSheetController: ActionSheetController
    ) { }

    ngOnInit() {
        this.storage.get('book').then((val) => {
            this.db.getJson().subscribe(response => {
                this.book = response.filter(item => item.id === val)[0];
                this.selectBook(val);
            });
        }).catch(err => console.log(err));
    }

    changeBook() {
        this.storage.get('book').then((val) => {
            if (val === 1) {
                this.bookImgName = 'assets/portada2.jpg';
                this.storage.set('book', 2);
                this.db.getJson().subscribe(response => {
                    this.book = response.filter((item: any) => item.id === 2)[0];
                });
                this.selectBook(2);

            } else if (val === 2) {
                this.bookImgName = 'assets/portada1.jpg';
                this.storage.set('book', 1);
                this.db.getJson().subscribe(response => {
                    this.book = response.filter((item: any) => item.id === 1)[0];
                });
                this.selectBook(1);
            }

            this.splash = true;
            this.ionViewDidLoad();
        }).catch(err => console.log(err));
    }

    ionViewDidLoad() {
        setTimeout(() => this.splash = false, 2500);
    }

    selectBook(val) {
        if (val === 1) {
            this.selectedBook = true;
            this.imgImprimatur = 'assets/imprimatur1.jpg';
            this.themeService.removeBodyClass('gold')
        } else if (val === 2) {
            this.selectedBook = false;
            this.imgImprimatur = 'assets/imprimatur2.png';
            this.themeService.addBodyClass('gold')
        }
    }

    share() {
        this.socialSharing.share(this.message, this.subject, this.file, this.url)
                        .then((res) => console.log(res))
                        .catch(err => console.log(err));
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
          header: 'Albums',
          buttons: [{
            text: 'Delete',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              console.log('Delete clicked');
            }
          }, {
            text: 'Share',
            icon: 'share',
            handler: () => {
              console.log('Share clicked');
            }
          }, {
            text: 'Play (open modal)',
            icon: 'arrow-dropright-circle',
            handler: () => {
              console.log('Play clicked');
            }
          }, {
            text: 'Favorite',
            icon: 'heart',
            handler: () => {
              console.log('Favorite clicked');
            }
          }, {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]
        });
        await actionSheet.present();
      }

}
