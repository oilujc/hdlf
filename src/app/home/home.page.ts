import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Book } from '../interfaces/book';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	book : Book;
	selectedBook: boolean;

	constructor(
		private storage: Storage,
		private router: Router,
		private db: DatabaseService, 
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
			console.log(val);
			if (val == 1) {
				this.storage.set('book', 2);
				this.db.getJson().subscribe(response => {
					this.book = response.filter(item => item.id === 2)[0];
				});
				this.selectBook(2);

			} else if (val == 2){
				this.storage.set('book', 1);
				this.db.getJson().subscribe(response => {
					this.book = response.filter(item => item.id === 1)[0];
				});
				this.selectBook(1);
			}
		}).catch(err=> console.log(err));
	}

	selectBook(val) {
		if (val == 1) {
			this.selectedBook = true;
		} else if (val == 2) {
			this.selectedBook = false;
		}
	}

}
