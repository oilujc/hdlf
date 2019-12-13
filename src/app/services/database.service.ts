import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController, Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../interfaces/book';
import { ThemingService } from './theming.service';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private bookSubject = new BehaviorSubject([]);
    private currentBook: Book[];

    constructor(private http: HttpClient,
                private storage: Storage,
                private router: Router,
                private platform: Platform,
                public alertController: AlertController,
                public toastController: ToastController,
                private themeService: ThemingService,
                ) { }

    getJson() {
        return this.http.get<any>('assets/hdlf.json');
    }

    getSectionsJson() {
        return this.http.get<any>('assets/section.json');
    }

    getContentsJson() {
        return this.http.get<any>('assets/content.json');
    }

    getCurrentBook(): Observable<Book[]> {
        return this.bookSubject.asObservable();
    }

    setBook(val: number) {
        this.getJson().subscribe(response => {
            if (val === 1) {
                this.themeService.removeBodyClass('gold')
            } else if (val === 2) {
                this.themeService.addBodyClass('gold')
            }
            this.storage.set('book', val);
            this.currentBook = response.filter(item => item.id === val);
            this.bookSubject.next(this.currentBook);
        });
    }

}
