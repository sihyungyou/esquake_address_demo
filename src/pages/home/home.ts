import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Searchse : any = '';
  srchwrd : any = '';
  roads = [];
  constructor (private http : Http) {

    console.log('home');
  }

  printroadconsole(par) {
    console.log(par);
  }
  datapassing(){
    this.roads = [];
    console.log('data passing')
    this.getMessages(this.Searchse, this.srchwrd).subscribe( (data) => {
      // console.log('only data');
      // console.log(data);
      console.log('data body get newadress')
      console.log(JSON.parse(data['_body'])['NewAddressListResponse']['newAddressListAreaCd'])
      for (var _i = 0; _i < JSON.parse(data['_body'])['NewAddressListResponse']['newAddressListAreaCd'].length; _i++){
        console.log(JSON.parse(data['_body'])['NewAddressListResponse']['newAddressListAreaCd'][_i]['lnmAdres']);
        this.roads.push(JSON.parse(data['_body'])['NewAddressListResponse']['newAddressListAreaCd'][_i]['lnmAdres'])
      }
    });
  }
  //response data 받아오는 형식
  //Response _body
  // {"NewAddressListResponse":
  //   {"cmmMsgHeader":
  //     {"requestMsgId":"","responseMsgId":"","responseTime":"20181104:042840467","successYN":"Y","returnCode":"00","errMsg":"","totalCount":6,"countPerPage":10,"totalPage":1,"currentPage":""},
  //     "newAddressListAreaCd":[
  //       {"zipNo":"07975","lnmAdres":"서울특별시 양천구 목동중앙본로 50 (목동)","rnAdres":"서울특별시 양천구 목동 234-5"},
  //       {"zipNo":"07975","lnmAdres":"서울특별시 양천구 목동중앙본로 50-5 (목동)","rnAdres":"서울특별시 양천구 목동 234-7"},
  //       {"zipNo":"07975","lnmAdres":"서울특별시 양천구 목동중앙본로 50-7 (목동)","rnAdres":"서울특별시 양천구 목동 229-1"},
  //       {"zipNo":"07975","lnmAdres":"서울특별시 양천구 목동중앙본로 50-9 (목동)","rnAdres":"서울특별시 양천구 목동 229-1"},
  //       {"zipNo":"07975","lnmAdres":"서울특별시 양천구 목동중앙본로 50-12 (목동, 웨스트빌아파트)","rnAdres":"서울특별시 양천구 목동 949 웨스트빌아파트"},
  //       {"zipNo":"07975","lnmAdres":"서울특별시 양천구 목동중앙본로 50-17 (목동, 샤인에버빌)","rnAdres":"서울특별시 양천구 목동 235-9 샤인에버빌"}]
  //     }
  //   }

  getMessages(par1, par2) {
    console.log('get message');
    console.log(par1, par2)
    var url = `http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd?ServiceKey=CTwTNEheKCyHIBYx4sz7Lxkf4vg%2Bkh6f2G%2BvypL6qqZk2j90baTIMesmZNhoIcM4%2FSUio%2FJ3xEMe3xZ6JSn7Lg%3D%3D&searchSe=${par1}&srchwrd=${par2}`;
    return this.http.get(url)
    // return this.http.get(url, {params : {"ServiceKey": "CTwTNEheKCyHIBYx4sz7Lxkf4vg%2Bkh6f2G%2BvypL6qqZk2j90baTIMesmZNhoIcM4%2FSUio%2FJ3xEMe3xZ6JSn7Lg%3D%3D", "searchSe" : "road", "srchwrd" : "한동로 558" }})
    // .do(res => console.log(res));
  }
}
