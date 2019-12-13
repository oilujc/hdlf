import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Mark } from '../interfaces/mark';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookmarkService {
    private markSubject = new BehaviorSubject([]);
    private marks: Mark[];

    constructor(
        private storage: Storage,
        private toastController: ToastController,
    ) { }

    getMarks() : Observable<Mark[]> {
        return this.markSubject.asObservable();
    }

    loadMarks() {
        this.storage.get('marks').then((items: Mark[]) => {
            this.marks = items;
        })
    }

    addMark(mark: Mark) {
        this.storage.get('marks').then((items: Mark[]) => {
            let msg = '';
            if (items && items.length > 0) {

                const item = items.find(data => data.idChapter === mark.idChapter &&
                                                data.idSubchapter === mark.idSubchapter);

                console.log(item);

                if (item) {
                    msg = 'Ya has guardado esta posición en tus marcadores';
                } else {
                    items.push(mark);
                    this.storage.set('marks', items);
                    this.marks = [...items];
                    this.markSubject.next(this.marks);
                    msg = 'Se ha guardado esta posición para continuar leyendo luego';
                }
            } else {
                this.storage.set('marks', [mark]);
                this.marks = [mark];
                this.markSubject.next(this.marks);
                msg = 'Se ha guardado esta posición para continuar leyendo luego';
            }
            this.showToast(msg);
        }).catch(err => console.log(err));
    }

    deleteMark(idchapter, idsubchapter) {
        this.storage.get('marks').then((items: Mark[]) => {
          if (items) {
            this.marks = items.filter(data => data.idChapter !== idchapter && data.idSubchapter !== idsubchapter);
            this.storage.set('marks', this.marks);
            this.markSubject.next(this.marks);
            this.showToast('Marcador eliminado correctamente!');
          }
        }).catch(err=>console.log(err));
      }

    async showToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }


}
