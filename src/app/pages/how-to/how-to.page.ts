import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { Chapter } from 'src/app/interfaces/chapter';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-how-to',
    templateUrl: './how-to.page.html',
    styleUrls: ['./how-to.page.scss'],
})
export class HowToPage implements OnInit {
    chapters: Chapter[];

    validChapters = ['13', '14', '15'];

    constructor(
        private db: DatabaseService,
        private router: Router,
        private storage: Storage,
    ) { }

    ngOnInit() {
        this.db.getJson().subscribe(response => {
            this.chapters = response.filter(item => item.id === '2')[0].chapter.sort((a: any, b: any) => a.chapter - b.chapter);
            this.chapters = this.chapters.filter(item => item.page_type === 'ch' && this.validChapters.includes(item.chapter));
        });
    }

    goToPage(id, pageType) {
        if (pageType === 'ch') {
            this.router.navigateByUrl(`subchapters/${id}`);
        } else {
            this.router.navigateByUrl(`content/${id}`);
        }
    }

}
