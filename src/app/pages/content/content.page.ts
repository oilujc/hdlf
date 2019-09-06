import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from "../../interfaces/chapter";
import { Subchapter } from "../../interfaces/subchapter";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {

  	chapter: Chapter;
    idChapter: number;
    scale: string = '16px';
    scaleNumber: number = 16;
    zoomInActive: boolean = true;
    zoomOutActive: boolean = false;


  constructor(
    private storage: Storage,
    private db: DatabaseService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  	) { }

  ngOnInit() {
  	this.idChapter = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.storage.get('book').then((val) => {
       this.db.getJson().subscribe(response => {
        this.chapter = response.filter(item => item.id === val)[0].chapter.filter(item => item.id === this.idChapter)[0];
      });
    }).catch(err=>console.log(err));
  }

    zoomOut() {
   if (this.scaleNumber > 16 && this.scaleNumber <= 32) {
       if (this.zoomInActive === false) {
          this.zoomInActive = true;
        }
        this.scaleNumber -= 2;
        this.scale = this.scaleNumber.toString()+'px';
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
      this.scale = this.scaleNumber.toString()+'px';
    
    } else if (this.scaleNumber >= 32) {
      this.zoomInActive = false;
    }
  }

}
