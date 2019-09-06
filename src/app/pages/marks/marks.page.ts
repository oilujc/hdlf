import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Mark } from '../../interfaces/mark';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-marks',
  templateUrl: './marks.page.html',
  styleUrls: ['./marks.page.scss'],
})
export class MarksPage implements OnInit {

  marks : Mark[];

  constructor(
  	private storage: Storage,
    public toastController: ToastController,
    private router: Router
  	) { }

  ngOnInit() {
  	this.storage.get("marks").then((items: Mark[]) => {
  		if (items) {
        this.marks = items;
      }
  	}).catch(err=>console.log(err));
  }

  delete(idchapter, idsubchapter) {
    console.log(idchapter, idsubchapter);
    this.storage.get("marks").then((items: Mark[]) => {
      if (items) {
        this.marks = items.filter(data => data.idChapter !== idchapter && data.idSubchapter !== idsubchapter);
        this.storage.set('marks', this.marks);
        this.showToast("Marcador eliminado correctamente!");
      }
    }).catch(err=>console.log(err));
  }

  goToPage(idChapter, idSubchapter, book) {
     this.storage.get('book').then((val) => {
      if (val !== book) {
        // code...
        this.storage.set("book", book);
      }
      
      this.router.navigateByUrl(`pages/${idChapter}/${idSubchapter}`);
      }).catch(err=>console.log(err));
     
  }

  async showToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


}
