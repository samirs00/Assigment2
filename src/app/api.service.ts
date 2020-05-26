import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }




  jsonGetApiCallObservableHandler(api: any, cb) {
    let headers = new HttpHeaders()
      // .set('Content-Type', 'text/html')
      .set('Access-Control-Allow-Origin','*')
      
      // headers.append('Access-Control-Allow-Origin','*');
      // headers = headers.append('Content-Type', 'text/xml');
      headers = headers.append('Accept', '*/*');
    // if (api.header) {
    //   headers.append(api.authorizationKey.key, api.authorizationKey.value)
    // }
    this.jsonGetApiCall(api.url, headers).subscribe(res => {
      cb(res);
    }, err => {
      console.log('error :', err)
      cb(err);
    });
  }
  jsonGetApiCall(url, header): Observable<any> {
    return this.http.get(url, {headers:header, responseType: 'text'})
  }

}
