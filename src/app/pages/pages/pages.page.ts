import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from "../../interfaces/chapter";
import { Subchapter } from "../../interfaces/subchapter";
import { Storage } from '@ionic/storage';
import { PopoverController, ActionSheetController } from '@ionic/angular';

import { MoreBtnComponent } from '../../components/more-btn/more-btn.component';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.page.html',
    styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {
    book: number;
    chapter: Chapter;
    subchapter: Subchapter;
    idChapter: number;
    idSubChapter: number;
    scale = '16px';
    scaleNumber = 16;
    zoomInActive = true;
    zoomOutActive = false;

    constructor(
        private storage: Storage,
        private db: DatabaseService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private popoverController: PopoverController,
        private actionSheetController: ActionSheetController,
        private bookmarkService: BookmarkService
    ) { }

    ngOnInit() {

        this.idChapter = parseInt(this.activatedRoute.snapshot.paramMap.get('idc'));
        this.idSubChapter = parseInt(this.activatedRoute.snapshot.paramMap.get('ids'));

        this.db.getCurrentBook().subscribe(book => {
            if (book[0] !== undefined) {
                this.book = book[0].id;
                this.chapter = book[0].chapter.filter(item => item.id === this.idChapter)[0];
                this.subchapter = this.chapter.subchapter.filter(item => item.id === this.idSubChapter)[0];
            }
        });
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
                text: 'Marcar Lectura',
                role: 'bookmark',
                icon: 'trash',
                handler: () => {
                    this.bookmarkService.addMark({
                        book: this.book,
                        idChapter: this.idChapter,
                        idSubchapter: this.idSubChapter,
                        chapterTitle: this.chapter.title,
                        subChapterTitle: this.subchapter.title,
                        chapter: this.chapter.chapter
                    })
                }
            }, {
                text: 'Compartir Lectura',
                icon: 'share',
                handler: () => {
                    console.log('Share clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: MoreBtnComponent,
            event: ev,
            componentProps: {
                book: this.book,
                idChapter: this.idChapter,
                idSubChapter: this.idSubChapter,
                chapterTitle: this.chapter.title,
                subChapterTitle: this.subchapter.title,
                chapter: this.chapter.chapter
            },
            animated: true,
            translucent: true
        });

        popover.onDidDismiss().then((dataReturned) => {
            console.log(dataReturned);
        });

        return await popover.present();
    }

    zoomOut() {
        if (this.scaleNumber > 16 && this.scaleNumber <= 32) {
            if (this.zoomInActive === false) {
                this.zoomInActive = true;
            }
            this.scaleNumber -= 2;
            this.scale = this.scaleNumber.toString() + 'px';
        } else if (this.scaleNumber == 16) {
            this.zoomOutActive = false;
        }

    }
    zoomIn() {
        if (this.scaleNumber >= 16 && this.scaleNumber < 32) {

            if (this.zoomOutActive === false) {
                this.zoomOutActive = true;
            }

            this.scaleNumber += 2;
            this.scale = this.scaleNumber.toString() + 'px';

        } else if (this.scaleNumber >= 32) {
            this.zoomInActive = false;
        }
    }

}
