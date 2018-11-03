import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/*
  Generated class for the MessageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageServiceProvider {
  // searchSe : any;
  word : any = "한동로 558";
  private url : string = `http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd?ServiceKey=CTwTNEheKCyHIBYx4sz7Lxkf4vg%2Bkh6f2G%2BvypL6qqZk2j90baTIMesmZNhoIcM4%2FSUio%2FJ3xEMe3xZ6JSn7Lg%3D%3D&searchSe=road&srchwrd=${word}`;
  // private url : string = "http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd";
  constructor(private http: Http) {
    console.log('Hello MessageServiceProvider Provider');
  }
  getMessages() {
  //   var headers = new Headers();
  //   headers.append('Access-Control-Allow-Origin' , '*');
  //   headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  //   headers.append('Accept','application/json');
  //   headers.append('content-type','application/json');
  // let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url)
    // return this.http.get(this.url, {params : {"ServiceKey": "CTwTNEheKCyHIBYx4sz7Lxkf4vg%2Bkh6f2G%2BvypL6qqZk2j90baTIMesmZNhoIcM4%2FSUio%2FJ3xEMe3xZ6JSn7Lg%3D%3D", "searchSe" : "road", "srchwrd" : "한동로 558" }})
    .do(res => console.log(res));
  }
}
