import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the RealhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-realhome',
  templateUrl: 'realhome.html',
})
export class RealhomePage {
  title: string = 'title';

  constructor(public navCtrl: NavController, public modalCtrl : ModalController,) {
  }
  showModal(){
    let profileModal = this.modalCtrl.create(HomePage);
    
    profileModal.onDidDismiss(data => { this.title = data; });

    profileModal.present();
  }
}