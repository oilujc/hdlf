import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss'],
})
export class FrontComponent implements OnInit {
	@Input() book: Book;


	constructor(
		private storage: Storage,
		private router: Router,
		private db: DatabaseService, 
	) {}

	ngOnInit() {

	}
}
