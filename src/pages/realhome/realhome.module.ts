import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RealhomePage } from './realhome';

@NgModule({
  declarations: [
    RealhomePage,
  ],
  imports: [
    IonicPageModule.forChild(RealhomePage),
  ],
})
export class RealhomePageModule {}
