import { HostListener, Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  hostAddress = 'https://stockappnodedemo.herokuapp.com/';

  constructor(private http: HttpClient) { }

  postData(url:string, data:any) {
    // const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.
    // post(this.hostAddress + url, data, { headers: header})
    //   .pipe(map(Response => {
    //     return Response
    //   }))
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http
            .post(this.hostAddress + url, data, { headers: header})
            .map((response: any) => {
              // const res = response.json();
                return response;
            })
            .catch((error: Response) => {
                    return Observable.throw('something went wrong');
                  });
  }

  getData(url:string) {
    // const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.
    // post(this.hostAddress + url, data, { headers: header})
    //   .pipe(map(Response => {
    //     return Response
    //   }))
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http
            .get(this.hostAddress + url, { headers: header})
            .map((response: any) => {
              // const res = response.json();
                return response;
            })
            .catch((error: Response) => {
                    return Observable.throw('something went wrong');
                  });
  }
}
