import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { Book } from "../../interfaces/book";
import { Chapter } from "../../interfaces/chapter";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.page.html',
  styleUrls: ['./chapters.page.scss'],
})
export class ChaptersPage implements OnInit {

  chapters: Chapter[];

  constructor(
		private db: DatabaseService,
    private router: Router,
    private storage: Storage,
  	) { }

  ngOnInit() {
      this.storage.get('book').then((val) => {
         this.db.getJson().subscribe(response => {
          this.chapters = response.filter(item => item.id === val)[0].chapter;
        });
      }).catch(err=>console.log(err));
	   

  }

  goToPage(id, page_type) {
    if (page_type == "ch") {
      this.router.navigateByUrl(`subchapters/${id}`);
    } else {
      this.router.navigateByUrl(`content/${id}`);
    }
  }

}
