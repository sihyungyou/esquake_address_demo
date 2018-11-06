import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { TestPage } from '../test/test';
// import { Body } from '@angular/http/src/body';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Searchse : any = '';
  srchwrd : any = '';
  roads = [];
  recents = [];
  recentflag : boolean = false;
  nthflag : boolean = false;
  selectedaddress : string;

  constructor (private http : Http, public navCtrl: NavController, public viewCtrl: ViewController) {
    console.log('home');
  }
  setLocation(data) {
    this.selectedaddress = data;
    this.viewCtrl.dismiss(this.selectedaddress);
  }
  dismiss(){
    this.viewCtrl.dismiss(this.selectedaddress);  
  }

  // 다른 곳에서 homepage 들어올 때마다 실행되는 함수
  ionViewWillEnter() {
    // empty road array 안해주면 계속 전에 검색했던 주소들 다 프린트 됨
    this.nthflag = false;
    this.roads = [];

    // 여기서는 default 로 최근검색기록 확인, print
    if (this.recents.length == 0) this.recentflag = false;
    else this.recentflag = true;
  }

  datapassing(){
    // search 버튼 누르면 검색했다는 뜻 && datapassing() 실행
    // => datapassing() 실행하면 this.recents에 push
    // push 할 때, 이미 recents array 에 있으면 추가 하지 않음
    var _j = 0;
    for(_j = 0; _j < this.recents.length; _j++){
      if (this.recents[_j] == this.srchwrd) break;
    }
    if (_j == this.recents.length) this.recents.push(this.srchwrd)


    // recentflag 바꿔서 최근검색기록은 print 안되도록
    this.recentflag = false;
    
    // nthflag 바꿔서 찾으시는 주소 없다고 안 뜨도록
    this.nthflag = false;
    
    // 새로운 검색기록 roads에 push 하기 전에 empty roads array
    this.roads = [];

    this.getMessages(this.Searchse, this.srchwrd).subscribe((data) => {
      // console.log(data)
      // console.log(JSON.parse(data['_body'])['NewAddressListResponse']['newAddressListAreaCd'])
      // console.log(JSON.parse(data['_body'])['NewAddressListResponse']['cmmMsgHeader']['totalCount'])  얘가 반환값이 있는지 없는지를, 몇개인지를 알려주는 element임!

      if (JSON.parse(data['_body'])['NewAddressListResponse']['cmmMsgHeader']['totalCount'] == ""){
        // 반환 값이 아예 없는 애들 -> exception 처리
        console.log('length error')
        this.nthflag = true;
      }
      else if (JSON.parse(data['_body'])['NewAddressListResponse']['cmmMsgHeader']['totalCount'] == "1"){
        // 반환 값이 하나인 애들
        console.log('접근방식 다른 애들 (결과가 하나 뿐인 애들)')
        this.roads.push(JSON.parse(data['_body'])['NewAddressListResponse']['newAddressListAreaCd']['lnmAdres'])
      }
      else {
        // 반환 값이 2 이상인 애들
        for (var _i = 0; _i < JSON.parse(data['_body'])['NewAddressListResponse']['newAddressListAreaCd'].length; _i++) {
          console.log('for loop')
          this.roads.push(JSON.parse(data['_body'])['NewAddressListResponse']['newAddressListAreaCd'][_i]['lnmAdres'])
        }
      }
    });
  }

  gototest() {
    this.navCtrl.push(TestPage);
  }

  getMessages(par1, par2) {
    console.log('get message');
    console.log(par1, par2)
    var url = `http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd?ServiceKey=CTwTNEheKCyHIBYx4sz7Lxkf4vg%2Bkh6f2G%2BvypL6qqZk2j90baTIMesmZNhoIcM4%2FSUio%2FJ3xEMe3xZ6JSn7Lg%3D%3D&searchSe=${par1}&srchwrd=${par2}`;
    return this.http.get(url)
  }
}


