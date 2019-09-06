import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subchapter } from '../../interfaces/subchapter';
import { ToastController } from '@ionic/angular';

import { Mark } from '../../interfaces/mark';

@Component({
  selector: 'app-more-btn',
  templateUrl: './more-btn.component.html',
  styleUrls: ['./more-btn.component.scss'],
})
export class MoreBtnComponent implements OnInit {
	page;
	item : Mark;

  constructor( private events: Events,
    private navParams: NavParams,
    private storage: Storage,
	public toastController: ToastController,
    private popoverController: PopoverController) { }

  ngOnInit() {

  	this.page = this.navParams.data;
  	this.item = {
  	  book: this.navParams.data.book,
	  idChapter: this.navParams.data.idChapter,
	  idSubchapter: this.navParams.data.idSubChapter,
	  chapterTitle: this.navParams.data.chapterTitle,
	  subChapterTitle: this.navParams.data.subChapterTitle,
	  chapter: this.navParams.data.chapter
	}
  }

  markPage() {
  	this.storage.get("marks").then((items: Mark[]) => {
  		let msg = "";
  		let exist = false;
  	  if (items && items.length > 0) {

  	  	let item = items.find(data => data.idChapter === this.item.idChapter && data.idSubchapter === this.item.idSubchapter);

  	  	if (item) {
  	  		msg = "Ya has guardado esta posición en tus marcadores";
  	  	} else {
  	  		items.push(this.item);
	        this.storage.set("marks", items);
	        msg = "Se ha guardado esta posición para continuar leyendo luego";
  	  	}

      } else {
        this.storage.set("marks", [this.item]);
        msg = "Se ha guardado esta posición para continuar leyendo luego";
      } 
      this.showToast(msg);
      this.closeModal(msg);
  	}).catch(err=> console.log(err));
  }

   async showToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async closeModal(msg: string) {
    const onClosedData: string = msg;
    await this.popoverController.dismiss(onClosedData);
  }

}
