import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Book } from '../interfaces/book';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ThemingService } from '../services/theming.service';
import { ActionSheetController } from '@ionic/angular';
import { take, first } from 'rxjs/operators';
import { BookmarkService } from '../services/bookmark.service';

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
        private db: DatabaseService,
        private socialSharing: SocialSharing,
    ) { }

    ngOnInit() {
        this.db.getCurrentBook().subscribe(book => {
            this.book = book[0];
            if (this.book !== undefined) {
                if (this.book.id === 1) {
                    this.imgImprimatur = 'assets/imprimatur1.jpg';
                } else if (this.book.id === 2) {
                    this.imgImprimatur = 'assets/imprimatur2.png';
                }
            }
        })
    }

    share() {
        this.socialSharing.share(this.message, this.subject, this.file, this.url)
            .then((res) => console.log(res))
            .catch(err => console.log(err));
    }

}
