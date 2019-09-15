import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Book } from '../interfaces/book';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	book : Book;
	selectedBook: boolean;
	bookImgName = "assets/portada1.jpg";
	imgImprimatur: string;
	splash = false;

	message: string = "Hola esta es ap App de Hospitalitos De la Fe, espero que sea utíl para ti";
	subject: string = null;
	file: string = null;
	url:string = "https://play.google.com/store/apps/details?id=hospitalitos.de.la.fe";

	constructor(
		private storage: Storage,
		private router: Router,
		private db: DatabaseService,
		private socialSharing: SocialSharing
	) {}

	ngOnInit() {
		this.storage.get('book').then((val) => {
			this.db.getJson().subscribe(response => {
				this.book = response.filter(item => item.id === val)[0];
				this.selectBook(val);
			});
		}).catch(err=> console.log(err));
	}

	changeBook() {
		this.storage.get('book').then((val) => {
			if (val == 1) {
				this.bookImgName = "assets/portada2.jpg";
				this.storage.set('book', 2);
				this.db.getJson().subscribe(response => {
					this.book = response.filter(item => item.id === 2)[0];
				});
				this.selectBook(2);

			} else if (val == 2){
				this.bookImgName = "assets/portada1.jpg";
				this.storage.set('book', 1);
				this.db.getJson().subscribe(response => {
					this.book = response.filter(item => item.id === 1)[0];
				});
				this.selectBook(1);
			}

			this.splash = true;
			this.ionViewDidLoad();
		}).catch(err=> console.log(err));
	}

	ionViewDidLoad() {
	    setTimeout(() => this.splash = false, 3000);
	  }

	selectBook(val) {
		if (val == 1) {
			this.selectedBook = true;
			this.imgImprimatur = "/assets/imprimatur1.jpg";
		} else if (val == 2) {
			this.selectedBook = false;
			this.imgImprimatur = "/assets/imprimatur2.png";
		}
	}

	share() {
		this.socialSharing.share(this.message, this.subject, this.file, this.url).then((res)=>console.log(res)).catch(err=>console.log(err));
	}

}
