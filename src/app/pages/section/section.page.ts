import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-section',
  templateUrl: './section.page.html',
  styleUrls: ['./section.page.scss'],
})
export class SectionPage implements OnInit {

  slugSection: string;
  section:any;

  constructor(
      private db: DatabaseService,
      private activatedRoute: ActivatedRoute, 
      private router: Router) { }

  ngOnInit() {

  	this.slugSection = this.activatedRoute.snapshot.paramMap.get('slug');
  	this.db.getSectionsJson().subscribe(response => {
        this.section = response.filter(item => item.slug === this.slugSection)[0];
      });
    } 
    

}
