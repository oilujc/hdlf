import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController, Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

	constructor(private http: HttpClient, 
              private storage: Storage, 
              private router: Router,
              private platform: Platform,
              public alertController: AlertController,
              public toastController: ToastController) { }

  getJson() {
    return this.http.get<any>("assets/hdlf.json");
  }

  getSectionsJson() {
    return this.http.get<any>("assets/section.json");
  }

}
