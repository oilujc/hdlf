import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Mark } from '../../interfaces/mark';
import { ActivatedRoute, Router } from '@angular/router';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
    selector: 'app-marks',
    templateUrl: './marks.page.html',
    styleUrls: ['./marks.page.scss'],
})
export class MarksPage implements OnInit {

    marks: Mark[];

    constructor(private storage: Storage,
                public toastController: ToastController,
                private router: Router,
                private bookmarkService: BookmarkService,
                private db: DatabaseService
            ) { }

    ngOnInit() {
        this.bookmarkService.getMarks().subscribe(marks => {
            this.marks = marks;
            console.log(this.marks)
        });
    }

    delete(idchapter, idsubchapter) {
        this.bookmarkService.deleteMark(idchapter, idsubchapter);
    }

    goToPage(idChapter, idSubchapter, book) {
        console.log(book)
        this.storage.get('book').then((val) => {
            console.log(book, val)
            if (val !== book) {
                this.db.setBook(book);
            }

            this.router.navigateByUrl(`pages/${idChapter}/${idSubchapter}`);
        }).catch(err => console.log(err));
    }
}
