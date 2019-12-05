import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { Book } from "../../interfaces/book";
import { Chapter } from "../../interfaces/chapter";
import { Subchapter } from "../../interfaces/subchapter";
import { Content } from "../../interfaces/content";
import { Storage } from '@ionic/storage';


@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    chapters: Chapter[];
    contents: Content[];

    qsChapter: Chapter[];
    qsContent: Content[];

    isItemAvailable: boolean = false;
    filter: string = "num";

    constructor(
        private db: DatabaseService,
        private router: Router,
        private storage: Storage,
    ) { }


    ngOnInit() {
        this.storage.get('book').then((val) => {
            this.db.getJson().subscribe(response => {
                this.chapters = response.filter(item => item.id === val)[0].chapter.sort((a: any, b: any) => a.chapter - b.chapter);
                //this.qs = this.chapters;
                console.log(this.chapters);
            });
        }).catch(err => console.log(err));
    }

    segmentChanged(ev: any) {
        const filter = ev.target.value;
        console.log(filter);
        this.filter = filter;
    }

    getItems(ev: any) {
        console.log(ev)
		/* if (this.filter === 'num') {
			// set val to the value of the searchbar
			const qs = ev.target.value;
			// if the value is an empty string don't filter the items
			if (qs && qs.trim() != '') {
				let chapters = this.chapters.filter( item => item.title.toLowerCase().indexOf(qs.toLowerCase()) > -1);
				this.qsContent = chapters.
			}

		} else if (this.filter === 'str') {
			// set val to the value of the searchbar
			const qs = ev.target.value;
			console.log(qs);
			// if the value is an empty string don't filter the items
			if (qs && qs.trim() != '') {
				this.qsChapter = this.chapters.filter( item => item.title.toLowerCase().indexOf(qs.toLowerCase()) > -1);
			}
		}
		this.isItemAvailable = true; */

    }
}
