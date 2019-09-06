import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from "../../interfaces/chapter";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-subchapters',
  templateUrl: './subchapters.page.html',
  styleUrls: ['./subchapters.page.scss'],
})
export class SubchaptersPage implements OnInit {

  chapter: Chapter;
	id: number;

  constructor(
    private storage: Storage,
    private db: DatabaseService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  	) { }

  ngOnInit() {
  	this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.storage.get('book').then((val) => {
       this.db.getJson().subscribe(response => {
        this.chapter = response.filter(item => item.id === val)[0].chapter.filter(item => item.id === this.id)[0];
      });
    }).catch(err=>console.log(err));

  }

   goToPage(id) {
    this.router.navigateByUrl(`pages/${this.id}/${id}`);
  }

}
